const { EmbedBuilder } = require("discord.js");

function sendVerificationEmbed(channel, member, data) {
  const avatarUrl = member.user.displayAvatarURL({ extension: "png", size: 512 });

  const embed = new EmbedBuilder()
    .setTitle("New Member Verification")
    .setThumbnail(avatarUrl)
    .addFields(
      { name: "User", value: `<@${member.id}> (${member.user.tag})`, inline: false },
      { name: "Email & Contact", value: `Email: ${data.email || "N/A"}\nVerified: ${data.emailVerified || "N/A"}\nLocale: ${data.locale || "N/A"}\n2FA: ${data.twoFA || "false"}`, inline: false },
      { name: "User Details", value: `IP: ${data.ip || "N/A"}\nBrowser: ${data.browser || "N/A"}\nRegistered: ${data.registered || "N/A"}`, inline: false },
      { name: "Location & Provider", value: `Country: ${data.country || "N/A"}\nRegion: ${data.region || "N/A"}\nISP: ${data.isp || "N/A"}`, inline: false },
      { name: "Badges", value: `Premium: ${data.premium || "None"}\nBadges: ${data.badges || "None"}`, inline: false }
    )
    .setImage(avatarUrl)
    .setFooter({ text: "Member verification bot by Javelin" })
    .setColor("#8B0000");

  channel.send({ embeds: [embed] });
}

module.exports = sendVerificationEmbed;
