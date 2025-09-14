const { EmbedBuilder } = require("discord.js");

module.exports = async function sendVerificationEmbed(channel, member, data) {
  const {
    email,
    emailVerified,
    locale,
    twoFA,
    ip,
    browser,
    registered,
    country,
    region,
    city,
    isp,
    premium,
    badges,
  } = data || {};

  const embed = new EmbedBuilder()
    .setTitle("Verification")
    .setThumbnail(member.user.displayAvatarURL({ extension: "png", size: 256 }))
    .setColor("#B22222");

  // 👤 User
  embed.addFields({
    name: "👤 User",
    value: `<@${member.id}> (${member.user.tag})`,
    inline: false,
  });

  // 📧 Email & Contact
  const emailSection = [];
  if (email) emailSection.push(`Email: ${email}`);
  if (emailVerified) emailSection.push(`Email verified: ${emailVerified}`);
  emailSection.push(`ID: ${member.id}`);
  if (locale) emailSection.push(`Locale: ${locale}`);
  if (twoFA) emailSection.push(`2FA enabled: ${twoFA}`);

  embed.addFields({
    name: "Email & Contact",
    value: emailSection.join("\n"),
    inline: false,
  });

  // 💻 Tech Details
  const techSection = [];
  if (ip) techSection.push(`IP Address: ${ip}`);
  if (browser) techSection.push(`Browser: ${browser}`);
  if (registered) techSection.push(`Registered: ${registered}`);
  if (techSection.length > 0) {
    embed.addFields({
      name: "Details",
      value: techSection.join("\n"),
      inline: false,
    });
  }

  // 🌍 Location & Provider
  const locSection = [];
  if (country) locSection.push(`Country: ${country}`);
  if (region || city) locSection.push(`Region: ${[region, city].filter(Boolean).join(", ")}`);
  if (isp) locSection.push(`ISP: ${isp}`);
  if (locSection.length > 0) {
    embed.addFields({
      name: "Location & Provider",
      value: locSection.join("\n"),
      inline: false,
    });
  }

  // 🎖 Badges & Membership
  const badgeSection = [];
  if (premium) badgeSection.push(`Premium: ${premium}`);
  if (badges) badgeSection.push(`Badges: ${badges}`);
  if (badgeSection.length > 0) {
    embed.addFields({
      name: "Badges",
      value: badgeSection.join("\n"),
      inline: false,
    });
  }

  embed.setFooter({ text: "Member verification and auth bot by Hebi" });

  await channel.send({ embeds: [embed] });
};
