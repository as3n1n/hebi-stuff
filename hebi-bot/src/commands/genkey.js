const { SlashCommandBuilder } = require("discord.js");
const { generateKey } = require("../utils/keyManager");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("genkey")
    .setDescription("Generate a new site access key (Admins only)"),

  async execute(interaction) {
    if (!interaction.memberPermissions.has("Administrator")) {
      return interaction.reply({ content: "❌ Only admins can use this.", ephemeral: true });
    }

    const key = generateKey(interaction.user.id);
    await interaction.reply({ content: `✅ New key generated:\n\`\`\`${key}\`\`\``, ephemeral: true });
  }
};
