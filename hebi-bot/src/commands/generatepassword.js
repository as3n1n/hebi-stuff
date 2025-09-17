const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const crypto = require("crypto");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("generatepassword")
    .setDescription("Generate a random password (Admins only)")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    try {
      const password = crypto.randomBytes(12).toString("base64url"); // exemple 16 chars random
      await interaction.reply({
        content: `🔑 Generated password:\n\`\`\`${password}\`\`\``,
        ephemeral: true,
      });
    } catch (err) {
      console.error("Failed to generate password:", err);
      await interaction.reply({
        content: "❌ Failed to generate password.",
        ephemeral: true,
      });
    }
  },
};
