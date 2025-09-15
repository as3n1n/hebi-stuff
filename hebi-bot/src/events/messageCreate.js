const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.bot || message.guild) return; 

    try {
      const logsChannel = await client.channels.fetch("1357083900828057811");
      if (!logsChannel) return console.error("Logs channel not found");

      // Embed DM reçu
      const embed = new EmbedBuilder()
        .setColor("#B22222")
        .setAuthor({
          name: `${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({ size: 256 }),
        })
        .setDescription(message.content || "*Aucun texte*")
        .setFooter({ text: `ID: ${message.author.id}` })
        .setTimestamp();

      // Bouton répondre
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`reply_${message.author.id}`)
          .setLabel("Répondre")
          .setStyle(ButtonStyle.Primary)
      );

      await logsChannel.send({ embeds: [embed], components: [row] });
    } catch (err) {
      console.error("Erreur log DM:", err);
    }
  });
};
