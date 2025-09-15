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

// verify endpoint
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Bot API running on port ${PORT}`));

// Interaction dispatcher
client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (command) await command.execute(interaction, client);
  }

  if (interaction.isButton()) {
    if (interaction.customId === "suggestion_modal") {
      return require("./interactions/suggestionModal").execute(interaction);
    }
    if (interaction.customId === "bugreport_modal") {
      return require("./interactions/bugReportModal").execute(interaction);
    }
  }

  if (interaction.isModalSubmit()) {
    if (interaction.customId === "suggestion_submit") {
      return require("./interactions/suggestionModal").handleSubmit(interaction);
    }
    if (interaction.customId === "bugreport_submit") {
      return require("./interactions/bugReportModal").handleSubmit(interaction);
    }
  }
});

// Enregistrer les slash commands au démarrage
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
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), // ⚡ guild → immédiat
      { body: commands }
    );
    console.log("Slash commands enregistrées !");
  } catch (err) {
    console.error("Erreur enregistrement slash:", err);
  }
});

client.login(process.env.DISCORD_TOKEN);


