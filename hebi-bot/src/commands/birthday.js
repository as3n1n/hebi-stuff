const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getBirthday } = require("../utils/birthdayStore");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("birthday")
    .setDescription("Affiche ton anniversaire ou celui d'un autre membre")
    .addUserOption(opt =>
      opt.setName("utilisateur")
        .setDescription("Membre à vérifier")
        .setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("utilisateur") || interaction.user;
    const date = getBirthday(user.id);

    if (!date) {
      return interaction.reply(`❌ Aucun anniversaire enregistré pour **${user.tag}**.`);
    }

    const embed = new EmbedBuilder()
      .setColor("#ff3b3b")
      .setTitle("🎂 Anniversaire")
      .setDescription(`🎂 **${user.tag}** fête son anniversaire le **${date}** !`);

    await interaction.reply({ embeds: [embed] });
  }
};
