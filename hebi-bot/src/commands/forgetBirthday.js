const { SlashCommandBuilder } = require("discord.js");
const { deleteBirthday } = require("../utils/birthdayStore");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("forget-birthday")
    .setDescription("Supprime ton anniversaire"),

  async execute(interaction) {
    deleteBirthday(interaction.user.id);
    await interaction.reply("❌ Ton anniversaire a été supprimé.");
  }
};
