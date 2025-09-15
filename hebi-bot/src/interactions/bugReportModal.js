const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder } = require("discord.js");

const OWNER_ID = "616042338325626890";

module.exports = {
  async execute(interaction) {
    const modal = new ModalBuilder().setCustomId("bugreport_submit").setTitle("🐛 Report Bug");

    const input = new TextInputBuilder()
      .setCustomId("bug_desc")
      .setLabel("Décris ton bug")
      .setStyle(TextInputStyle.Paragraph);

    modal.addComponents(new ActionRowBuilder().addComponents(input));
    await interaction.showModal(modal);
  },

  async handleSubmit(interaction) {
    const text = interaction.fields.getTextInputValue("bug_desc");

    const embed = new EmbedBuilder()
      .setTitle("Nouveau Bug Report")
      .setDescription(text)
      .setColor("Red")
      .setFooter({ text: `Par ${interaction.user.tag}` })
      .setTimestamp();

    try {
      const owner = await interaction.client.users.fetch(OWNER_ID);
      await owner.send({ embeds: [embed] });
      await interaction.reply({ content: "Bug envoyé à Chino", ephemeral: true });
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: "Impossible d’envoyer ton bug.", ephemeral: true });
    }
  },
};
