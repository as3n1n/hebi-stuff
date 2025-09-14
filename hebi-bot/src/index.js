require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
const cors = require("cors");
const sendVerificationEmbed = require("./utils/sendVerificationEmbed");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

// load events
require("./events/guildMemberAdd")(client);

// express API
const app = express();
app.use(cors({
  origin: "https://javelin.asia"
}));
app.use(express.json());

// verify endpoint
app.post("/api/verify", async (req, res) => {
  const { userId, secret } = req.body;
  if (secret !== process.env.API_SECRET) {
    return res.status(403).json({ success: false, error: "Unauthorized" });
  }

  try {
    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    const member = await guild.members.fetch(userId);
    const role = guild.roles.cache.find(r => r.name === "Verified");

    if (role && member) {
      await member.roles.add(role);
      return res.json({ success: true });
    } else {
      return res.json({ success: false, error: "Role or member not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// send embed endpoint
app.post("/api/sendEmbed", async (req, res) => {
  const { userId, ...data } = req.body;
  try {
    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    const member = await guild.members.fetch(userId);
    const channel = guild.channels.cache.find(c => c.name === "verification-logs");

    if (!channel) return res.status(404).json({ error: "Channel not found" });

    sendVerificationEmbed(channel, member, data);
    res.json({ success: true });
  } catch (err) {
    console.error("Error sending embed:", err);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Bot API running on port ${PORT}`));

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);
