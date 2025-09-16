const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  async execute(interaction) {
    if (!interaction.customId.startsWith("reply_")) return;

    const userId = interaction.customId.split("_")[1];

    const modal = new ModalBuilder()
      .setCustomId(`reply_submit_${userId}`)
      .setTitle("Répondre au DM");

    const input = new TextInputBuilder()
      .setCustomId("reply_text")
      .setLabel("Votre réponse")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    modal.addComponents(new ActionRowBuilder().addComponents(input));

    await interaction.showModal(modal);
  },

  async handleSubmit(interaction) {
    if (!interaction.customId.startsWith("reply_submit_")) return;

    const userId = interaction.customId.split("_")[2];
    const replyText = interaction.fields.getTextInputValue("reply_text");

    try {
      const user = await interaction.client.users.fetch(userId);
      await user.send(`💌 Réponse de l'équipe :\n\n${replyText}`);

      await interaction.reply({
        content: "✅ Message envoyé avec succès !",
        ephemeral: true,
      });
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: "❌ Impossible d’envoyer le message.",
        ephemeral: true,
      });
    }
  },
};
