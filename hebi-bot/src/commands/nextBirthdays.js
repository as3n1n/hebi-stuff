const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getAll } = require("../utils/birthdayStore");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("next-birthdays")
    .setDescription("Liste jusqu'à 10 anniversaires à venir"),

  async execute(interaction) {
    const db = getAll();
    if (Object.keys(db).length === 0) {
      return interaction.reply("❌ Aucun anniversaire enregistré.");
    }

    const today = new Date();
    const todayNum = today.getMonth() * 31 + today.getDate();

    const sorted = Object.entries(db).sort(([id1, date1], [id2, date2]) => {
      const [d1, m1] = date1.split("/").map(Number);
      const [d2, m2] = date2.split("/").map(Number);

      const num1 = (m1 - 1) * 31 + d1;
      const num2 = (m2 - 1) * 31 + d2;

      return num1 - num2;
    });

    const embed = new EmbedBuilder()
      .setColor("#ff3b3b")
      .setTitle("🎂 Prochains anniversaires");

    let desc = "";
    let count = 0;

    for (const [id, date] of sorted) {
      const member = await interaction.guild.members.fetch(id).catch(() => null);
      if (!member) continue;

      const [d, m] = date.split("/").map(Number);
      const num = (m - 1) * 31 + d;

      if (num >= todayNum) {
        desc += `🎂 **${date}** → ${member.user.tag}\n`;
        if (++count >= 10) break;
      }
    }

    embed.setDescription(desc || "Aucun anniversaire trouvé.");
    await interaction.reply({ embeds: [embed] });
  }
};
