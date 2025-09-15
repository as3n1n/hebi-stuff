const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { setBirthday } = require("../utils/birthdayStore");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("birthdayadd")
    .setDescription("Ajoute l'anniversaire d’un membre en le mentionnant (admin seulement)")
    .addUserOption(opt =>
      opt.setName("utilisateur")
        .setDescription("Mentionne l’utilisateur")
        .setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName("date")
        .setDescription("Date de l’anniversaire (format JJ/MM)")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild), // seulement admin

  async execute(interaction) {
    const user = interaction.options.getUser("utilisateur");
    const date = interaction.options.getString("date");

    // Vérif format JJ/MM
    if (!/^\d{1,2}\/\d{1,2}$/.test(date)) {
      return interaction.reply({ content: "❌ Format invalide. Utilise **JJ/MM**.", ephemeral: true });
    }

    setBirthday(user.id, date);

    await interaction.reply({
      content: `✅ Anniversaire de ${user} enregistré pour le **${date}**.`,
    });
  }
};
