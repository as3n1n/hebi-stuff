module.exports = (client) => {
  client.on("guildMemberAdd", async (member) => {
    try {
      const link = `https://javelin.asia/verify?uid=${member.id}`;
      await member.send(
        `Welcome **${member.user.username}**!\n\nPlease verify your account here: ${link}`
      );
    } catch (err) {
      console.error("Failed to send DM:", err);
    }
  });
};
