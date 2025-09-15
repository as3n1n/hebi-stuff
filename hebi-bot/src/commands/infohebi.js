// src/commands/infohebi.js
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require("discord.js");
const { getLatestVinted } = require("../utils/vintedApi");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("infohebi")
    .setDescription("Infos Hebi")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    // récupération des derniers posts
    const items = await getLatestVinted(3);

    const embed = new EmbedBuilder()
      .setTitle("Hebi – Dashboard Info")
      .setDescription("Voici les dernières infos et fonctionnalités :")
      .setColor("#B22222")
      .addFields(
        { name: "API Status", value: "Toutes les API fonctionnent", inline: true },
        { name: "Cooldown", value: "60s par utilisateur", inline: true },
      )
      .setFooter({ text: "Hebi Verification & Tools" })
      .setTimestamp();

    if (items.length > 0) {
      embed.addFields({
        name: "Derniers articles Vinted",
        value: items.map(i => `**${i.title}** - ${i.price}\n[Voir l'article](${i.url})`).join("\n\n"),
      });
    } else {
      embed.addFields({ name: "Derniers articles Vinted", value: "Aucun article trouvé." });
    }

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Vinted Tracker")
        .setStyle(ButtonStyle.Success)
        .setCustomId("vinted_refresh"),
      new ButtonBuilder()
        .setLabel("Suggestion")
        .setStyle(ButtonStyle.Primary)
        .setCustomId("suggestion_modal")
    );

    await interaction.editReply({ embeds: [embed], components: [row] });
  },
};
