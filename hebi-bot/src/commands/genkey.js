const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { generateKey } = require("../utils/keyManager");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("genkey")
    .setDescription("Generate a new site access key")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    try {
      const key = generateKey(interaction.user.id);
      await interaction.reply({
        content: `✅ New key generated:\n\`\`\`${key}\`\`\``,
        ephemeral: true
      });
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: "❌ Failed to generate key.",
        ephemeral: true
      });
    }
  }
};
