require("dotenv").config();
const { Client, GatewayIntentBits, Collection, REST, Routes } = require("discord.js");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const sendVerificationEmbed = require("./utils/sendVerificationEmbed");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.commands = new Collection();
client.cooldowns = new Set();

// Charger les commandes
const commandsPath = path.join(__dirname, "commands");
for (const file of fs.readdirSync(commandsPath)) {
  if (file.endsWith(".js")) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
  }
}

// Charger les events
require("./events/guildMemberAdd")(client);
require("./events/messageCreate")(client);

// Express API
const app = express();
app.set("trust proxy", true);
app.use(cors({ origin: process.env.SITE_ORIGIN || "https://javelin.asia" }));
app.use(express.json());

const birthdayChecker = require("./jobs/birthdayChecker");
setInterval(() => birthdayChecker(client), 1000 * 60 * 60 * 24); // tous les jours

// utils
function getClientIp(req) {
  const xf = (req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  return xf || req.ip || "";
}

async function geoFromIp(ip) {
  try {
    const r = await fetch(`https://ipapi.co/${ip}/json/`);
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

async function verifyHCaptcha(token, ip) {
  const params = new URLSearchParams();
  params.append("response", token);
  params.append("secret", process.env.HCAPTCHA_SECRET);
  if (ip) params.append("remoteip", ip);

  const r = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const j = await r.json();
  return !!j.success;
}

const { validateKey } = require("./utils/keyManager");

//
// 🚨 ALERT SYSTEM
//
app.post("/api/alert", async (req, res) => {
  const { userId, ip, reason } = req.body;

  try {
    const user = await client.users.fetch(userId);
    if (user) {
      await user.send({
        embeds: [
          {
            title: "Hebi API Security Alert",
            description: `A suspicious action was detected.\n\n**Reason:** ${reason}\n**IP:** ${ip}`,
            color: 0xff0000,
            timestamp: new Date().toISOString(),
          },
        ],
      });
    }
  } catch (err) {
    console.error("Could not DM user:", err);
  }

  res.json({ success: true });
});

//
// 📂 NEW: Upload logs from Hebi API
//
app.post("/api/upload-log", async (req, res) => {
  try {
    const { file, url, preview, hashes, analysis } = req.body;

    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    const logChannel = guild?.channels.cache.get(process.env.LOGS_CHANNEL_ID);

    if (logChannel) {
      await logChannel.send({
        embeds: [
          {
            title: "📂 New Upload Logged",
            color: 0xff0000,
            fields: [
              { name: "File", value: file || "N/A" },
              { name: "Direct Link", value: url || "N/A" },
              { name: "Preview Link", value: preview || "N/A" },
              { name: "MD5", value: hashes?.md5 || "N/A" },
              { name: "SHA256", value: hashes?.sha256 || "N/A" },
              ...(analysis?.type ? [{ name: "Type", value: analysis.type }] : []),
              ...(analysis?.contents
                ? [{ name: "Archive Contents", value: analysis.contents.slice(0, 10).join("\n") }]
                : []),
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Upload log error:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

//
// Express server
//
const ALERT_PORT = process.env.ALERT_PORT || 3002;
app.listen(ALERT_PORT, () => console.log(`Bot listener running on ${ALERT_PORT}`));

// 🔐 Middleware de protection (sauf upload logs)
const protectedRoutes = ["/api/verify"];
app.use((req, res, next) => {
  if (protectedRoutes.includes(req.path)) {
    const key = req.headers["x-api-key"];
    const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim();

    if (!key || !validateKey(key, ip)) {
      return res.status(403).json({ success: false, error: "Invalid or unauthorized key" });
    }
  }
  next();
});

//
// ✅ VERIFY endpoint (protégé)
//
app.post("/api/verify", async (req, res) => {
  const { userId, secret, captchaToken } = req.body;
  if (secret !== process.env.API_SECRET) {
    return res.status(403).json({ success: false, error: "Unauthorized" });
  }

  try {
    const ip = getClientIp(req);

    // captcha
    const captchaOK = await verifyHCaptcha(captchaToken, ip);
    if (!captchaOK) {
      return res.status(400).json({ success: false, error: "Captcha failed" });
    }

    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    const member = await guild.members.fetch(userId);
    const role = guild.roles.cache.get(process.env.ROLE_ID);

    if (role && member) {
      await member.roles.add(role);

      const geo = await geoFromIp(ip);

      const channel = guild.channels.cache.get(process.env.LOGS_CHANNEL_ID);
      if (channel) {
        await sendVerificationEmbed(channel, member, {
          email: req.body.email,
          emailVerified: "true",
          locale: req.body.locale || "N/A",
          twoFA: "false",
          ip,
          browser: req.headers["user-agent"],
          registered: req.body.registered || "N/A",
          country: geo?.country_name,
          region: geo?.region,
          city: geo?.city,
          isp: geo?.org,
          premium: req.body.premium || "None",
          badges: req.body.badges || "None",
        });
      }

      return res.json({ success: true });
    } else {
      return res.json({ success: false, error: "Role or member not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

//
// ✅ Register slash commands
//
client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

  const commands = [];
  for (const [name, cmd] of client.commands) {
    commands.push(cmd.data.toJSON());
  }

  try {
    console.log("Enregistrement des commandes slash...");
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log("Slash commands enregistrées !");
  } catch (err) {
    console.error("Erreur enregistrement slash:", err);
  }
});

client.login(process.env.DISCORD_TOKEN);
