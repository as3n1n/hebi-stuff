const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    // --- Cas DM (type 1 = DM channel)
    if (message.channel.type === 1) {
      const relayChannelId = "1017410520158056448"; // nouveau salon pour relay
      const relayChannel = await client.channels.fetch(relayChannelId);

      if (!relayChannel) return;

      const embed = new EmbedBuilder()
        .setTitle("📩 Nouveau DM reçu")
        .setDescription(message.content || "*Aucun contenu*")
        .setColor("Red")
        .setFooter({ text: `De: ${message.author.tag} (${message.author.id})` })
        .setTimestamp();

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`reply_${message.author.id}`)
          .setLabel("Répondre")
          .setStyle(ButtonStyle.Primary)
      );

      relayChannel.send({ embeds: [embed], components: [row] });
    }
  });
};
