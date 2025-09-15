const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { deleteBirthday } = require("../utils/birthdayStore");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unset-user-birthday")
    .setDescription("Supprime la date d'anniversaire d'un utilisateur (admin)")
    .addUserOption(opt =>
      opt.setName("utilisateur")
        .setDescription("L’utilisateur")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const user = interaction.options.getUser("utilisateur");

    deleteBirthday(user.id);
    await interaction.reply(`❌ Anniversaire de **${user.tag}** supprimé.`);
  }
};
