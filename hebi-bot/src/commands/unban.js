const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban an IP address from Hebi API")
    .addStringOption(option =>
      option.setName("ip").setDescription("IP address to unban").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const ip = interaction.options.getString("ip");

    try {
      const res = await fetch(`${process.env.API_URL}/api/unban`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ip,
          secret: process.env.API_ADMIN_SECRET
        })
      });

      const data = await res.json();
      if (data.success) {
        await interaction.reply(`✅ IP \`${ip}\` has been unbanned.`);
      } else {
        await interaction.reply(`❌ Failed: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      await interaction.reply("❌ Error contacting Hebi API.");
    }
  }
};
