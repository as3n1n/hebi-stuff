const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
  async execute(interaction) {
    const userId = interaction.customId.split("_")[1];

    const modal = new ModalBuilder()
      .setCustomId(`replyModal_${userId}`)
      .setTitle("Répondre à l’utilisateur");

    const input = new TextInputBuilder()
      .setCustomId("replyMessage")
      .setLabel("Message à envoyer")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    modal.addComponents(new ActionRowBuilder().addComponents(input));

    await interaction.showModal(modal);
  },

  async handleSubmit(interaction, client) {
    const userId = interaction.customId.split("_")[1];
    const reply = interaction.fields.getTextInputValue("replyMessage");

    try {
      const user = await client.users.fetch(userId);
      await user.send(`✉️ **Réponse de Hebi**:\n${reply}`);

      await interaction.reply({ content: "Réponse envoyée avec succès.", ephemeral: true });
    } catch (err) {
      console.error("Erreur envoi réponse DM:", err);
      await interaction.reply({ content: "Impossible d’envoyer la réponse.", ephemeral: true });
    }
  },
};
