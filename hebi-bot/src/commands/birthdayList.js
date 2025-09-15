const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getAll } = require("../utils/birthdayStore");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("birthdaylist")
    .setDescription("Affiche tous les anniversaires enregistrés"),

  async execute(interaction) {
    const db = getAll();
    if (Object.keys(db).length === 0) {
      return interaction.reply("❌ Aucun anniversaire enregistré.");
    }

    const embed = new EmbedBuilder()
      .setTitle("🎂 Liste des anniversaires")
      .setColor("#ff3b3b");

    let desc = "";
    for (const [id, date] of Object.entries(db)) {
      const member = await interaction.guild.members.fetch(id).catch(() => null);
      if (!member) continue;
      desc += `🎂 **${date}** → ${member.user.tag}\n`;
    }

    embed.setDescription(desc || "Aucun membre trouvé.");
    await interaction.reply({ embeds: [embed] });
  }
};
