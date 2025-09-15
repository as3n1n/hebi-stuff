const { Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isButton() && interaction.customId === "send_suggestion") {
      const modal = new ModalBuilder()
        .setCustomId("suggestion_modal")
        .setTitle("Nouvelle Suggestion");

      const suggestionInput = new TextInputBuilder()
        .setCustomId("suggestion_text")
        .setLabel("Votre idée")
        .setStyle(TextInputStyle.Paragraph);

      const row = new ActionRowBuilder().addComponents(suggestionInput);
      modal.addComponents(row);

      await interaction.showModal(modal);
    }

    if (interaction.isModalSubmit() && interaction.customId === "suggestion_modal") {
      const suggestion = interaction.fields.getTextInputValue("suggestion_text");

      const embed = new EmbedBuilder()
        .setTitle("Nouvelle Suggestion")
        .setDescription(suggestion)
        .setColor("Red")
        .setFooter({ text: `Proposée par ${interaction.user.tag}` })
        .setTimestamp();

      const channel = interaction.client.channels.cache.get("979712369368395807");
      if (channel) await channel.send({ embeds: [embed] });

      await interaction.reply({ content: "Merci pour ta suggestion !", ephemeral: true });
    }
  }
};
