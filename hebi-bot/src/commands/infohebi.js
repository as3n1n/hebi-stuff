const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require("discord.js");
const { getLatestVinted } = require("../utils/vintedApi");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("infohebi")
    .setDescription("Dashboard Hebi")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction, client) {
    if (client.cooldowns.has(interaction.user.id)) {
      return interaction.reply({ content: "Attends 60s avant de réutiliser.", ephemeral: true });
    }
    client.cooldowns.add(interaction.user.id);
    setTimeout(() => client.cooldowns.delete(interaction.user.id), 60000);

    await interaction.deferReply({ ephemeral: true });

    const items = await getLatestVinted(3);

    const embed = new EmbedBuilder()
      .setTitle("Hebi")
      .setColor("#B22222")
      .addFields(
        { name: "API Status", value: "Toutes les API fonctionnent", inline: true },
        { name: "Derniers Vinted", value: items.length ? items.map(i => `[${i.title}](${i.url}) - ${i.price}`).join("\n") : "Aucun article trouvé.", inline: false },
        { name: "Suggestions", value: "Clique ci-dessous pour envoyer une idée.", inline: false },
        { name: "Report Bug", value: "Clique ci-dessous pour signaler un bug.", inline: false },
      );

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("suggestion_modal").setLabel("Suggestion").setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId("bugreport_modal").setLabel("Report Bug").setStyle(ButtonStyle.Danger),
    );

    await interaction.editReply({ embeds: [embed], components: [row] });
  },
};
