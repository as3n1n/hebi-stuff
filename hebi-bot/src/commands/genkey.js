const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { generateKey } = require("../utils/keyManager");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("genkey")
    .setDescription("Generate a new site access key (Admins only)")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const key = generateKey(interaction.user.id);

    if (!key) {
      return interaction.reply({
        content: "❌ Failed to generate key (check API logs).",
        ephemeral: true
      });
    }

    await interaction.reply({
      content: `✅ New key generated:\n\`\`\`${key}\`\`\``,
      ephemeral: true
    });
  }
};
