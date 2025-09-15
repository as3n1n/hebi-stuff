const { getAll } = require("../utils/birthdayStore");

module.exports = async function birthdayChecker(client) {
  const channel = await client.channels.fetch(process.env.BIRTHDAY_CHANNEL_ID);
  if (!channel) return;

  const today = new Date();
  const todayStr = `${today.getDate()}/${today.getMonth() + 1}`;

  const all = getAll();
  for (const [id, date] of Object.entries(all)) {
    if (date === todayStr) {
      const user = await client.users.fetch(id).catch(() => null);
      if (user) {
        await channel.send(`🎂 Joyeux anniversaire à ${user}!`);
      }
    }
  }
};
