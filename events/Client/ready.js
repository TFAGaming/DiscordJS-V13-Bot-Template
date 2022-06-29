const client = require("../../index.js");
const config = require("../../config.json");
const ms = require("ms");

client.once('ready', async () => {
  console.log(`[CLIENT] ${client.user.tag} is up and ready to go! Watching ${client.guilds.cache.size} servers and ${client.users.cache.size} uses.`);

  const up = ms(ms(Math.round(process.uptime() - (client.uptime / 1000)) + ' seconds'));

  console.log(`[NODEJS] Your IDE took ${up} to load and connect to the bot.`);

  client.user.setActivity(`${config.prefix}help`)
});