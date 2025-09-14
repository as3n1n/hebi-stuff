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
    lat,
    lon,
  } = data || {};

  // Map URL façon VaultCord
  let mapUrl = null;
  if (process.env.GOOGLE_MAPS_KEY && lat && lon) {
    const qs = new URLSearchParams({
      center: `${lat},${lon}`,
      zoom: "11",
      size: "700x300",
      maptype: "roadmap",
      markers: `color:red|${lat},${lon}`,
      key: process.env.GOOGLE_MAPS_KEY,
    });
    mapUrl = `https://maps.googleapis.com/maps/api/staticmap?${qs.toString()}`;
  }

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

  // Details
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
  if (region || city) locSection.push(`Region: ${region || ""} ${city || ""}`.trim());
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
  badgeSection.push(`Premium: ${premium || "None"}`);
  badgeSection.push(`Badges: ${badges || "None"}`);

  embed.addFields({
    name: "Badges",
    value: badgeSection.join("\n"),
    inline: false,
  });

  // 📌 Carte Google en bas
  if (mapUrl) embed.setImage(mapUrl);

  // footer stylé
  embed.setFooter({ text: "verification and auth bot by Hebi" });

  await channel.send({ embeds: [embed] });
};

