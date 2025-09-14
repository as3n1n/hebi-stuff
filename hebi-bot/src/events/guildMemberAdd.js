module.exports = (client) => {
  client.on("guildMemberAdd", async (member) => {
    try {
      const link = `https://javelin.asia/verify?uid=${member.id}`;

      await member.send({
        content: `Welcome **${member.user.username}**!\n\nPlease verify your account here to get access: ${link}`,
      });

      console.log(`Verification link sent to ${member.user.tag}`);
    } catch (err) {
      console.error(`Failed to send DM to ${member.user.tag}:`, err.message);
    }
  });
};
