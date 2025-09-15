const { SlashCommandBuilder } = require("discord.js");
const { setBirthday } = require("../utils/birthdayStore");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remember-birthday")
    .setDescription("Ajoute ton anniversaire")
    .addStringOption(opt =>
      opt.setName("date")
        .setDescription("Format JJ/MM")
        .setRequired(true)
    ),

  async execute(interaction) {
    const date = interaction.options.getString("date");
    if (!/^\d{1,2}\/\d{1,2}$/.test(date)) {
      return interaction.reply({ content: "❌ Format invalide. Utilise JJ/MM.", ephemeral: true });
    }

    setBirthday(interaction.user.id, date);
    await interaction.reply(`✅ Ton anniversaire a été enregistré pour le **${date}** !`);
  }
};
