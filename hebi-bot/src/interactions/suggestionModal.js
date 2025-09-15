const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder } = require("discord.js");

const SUGGESTION_CHANNEL = "979712369368395807";

module.exports = {
  async execute(interaction) {
    const modal = new ModalBuilder().setCustomId("suggestion_submit").setTitle("💡 Nouvelle Suggestion");

    const input = new TextInputBuilder()
      .setCustomId("suggestion_text")
      .setLabel("Votre suggestion")
      .setStyle(TextInputStyle.Paragraph);

    modal.addComponents(new ActionRowBuilder().addComponents(input));
    await interaction.showModal(modal);
  },

  async handleSubmit(interaction) {
    const text = interaction.fields.getTextInputValue("suggestion_text");

    const embed = new EmbedBuilder()
      .setTitle("💡 Suggestion")
      .setDescription(text)
      .setColor("Red")
      .setFooter({ text: `Par ${interaction.user.tag}` });

    const channel = interaction.client.channels.cache.get(SUGGESTION_CHANNEL);
    if (channel) await channel.send({ embeds: [embed] });

    await interaction.reply({ content: "Merci pour ta suggestion !", ephemeral: true });
  },
};
