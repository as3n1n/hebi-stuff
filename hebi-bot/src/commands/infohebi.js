// src/commands/infohebi.js
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const fetchVinted = require("../utils/vintedApi");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("infohebi")
    .setDescription("Afficher le dashboard Hebi"),

  async execute(interaction, client) {
    try {
      // Récup Vinted
      let vintedText = "Aucun article trouvé.";
      try {
        const items = await fetchVinted("nike"); // test -> tu peux changer la recherche
        if (items.length > 0) {
          vintedText = items
            .slice(0, 3) // seulement 3 derniers
            .map((i) => `[${i.title}](${i.url}) - ${i.price}€`)
            .join("\n");
        }
      } catch (e) {
        vintedText = "Impossible de récupérer les articles.";
      }

      // Embed style Hebi
      const embed = new EmbedBuilder()
        .setTitle("Hebi Dashboard")
        .setColor("#B22222")
        .setDescription("Panel central pour gérer les infos et retours sur Hebi.")
        .addFields(
          {
            name: "API Status",
            value: "Toutes les API fonctionnent",
            inline: false,
          },
          {
            name: "Derniers Vinted",
            value: vintedText,
            inline: false,
          },
          {
            name: "Suggestions",
            value: "Cliquez ci-dessous pour envoyer une idée.",
            inline: false,
          },
          {
            name: "Report Bug",
            value: "Cliquez ci-dessous pour signaler un bug.",
            inline: false,
          },
          {
            name: "Informations",
            value:
              "Le bot **Hebi** est notre bot dédié à *Hello Kitty Café*.\n" +
              "Il sera en ligne en permanence, sauf pendant les mises à jour ou en cas de panne de l’host.\n\n" +
              "Si vous souhaitez nous envoyer des idées de fonctionnalités, vous pouvez le faire via le bouton **Suggestion**.\n" +
              "**N’envoyez aucun message directement** car je peux suspendre cette option à tout moment.",
            inline: false,
          }
        )
        .setFooter({ text: "Hebi • Hebi" })
        .setTimestamp();

      // Boutons Suggestion et Bug
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("suggestion_modal")
          .setLabel("Suggestion")
          .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
          .setCustomId("bugreport_modal")
          .setLabel("Report Bug")
          .setStyle(ButtonStyle.Danger)
      );

      // Réponse visible pour tout le monde
      await interaction.reply({
        embeds: [embed],
        components: [row],
        ephemeral: false,
      });
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: "Erreur lors de la génération du dashboard.", ephemeral: true });
    }
  },
};
