const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { getLatestVintedPosts } = require("../utils/vintedApi");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("infohebi")
    .setDescription("Panneau d'information Hebi (Admins uniquement)")
    .setDefaultMemberPermissions(0), // admin only
  async execute(interaction) {
    if (!interaction.client.cooldowns) interaction.client.cooldowns = new Set();
    if (interaction.client.cooldowns.has(interaction.user.id)) {
      return interaction.reply({ content: "⏳ Attends 60 secondes avant de réutiliser la commande.", ephemeral: true });
    }
    interaction.client.cooldowns.add(interaction.user.id);
    setTimeout(() => interaction.client.cooldowns.delete(interaction.user.id), 60000);

    // Derniers posts Vinted
    const posts = await getLatestVintedPosts(process.env.VINTED_USER || "demo", 3);

    const embed = new EmbedBuilder()
      .setTitle("🔴 Hebi Control Panel")
      .setColor("Red")
      .addFields(
        { name: "Vinted Tracker", value: posts.length ? posts.map(p => `[${p.title}](${p.url}) - ${p.price}`).join("\n") : "Aucun post trouvé.", inline: false },
        { name: "API Status", value: "Online", inline: true },
        { name: "Suggestion", value: "Clique sur le bouton ci-dessous pour envoyer une idée.", inline: false }
      )
      .setFooter({ text: "Hebi Bot System", iconURL: interaction.client.user.displayAvatarURL() });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("send_suggestion")
        .setLabel("Envoyer une suggestion")
        .setStyle(ButtonStyle.Success)
    );

    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
  }
};
