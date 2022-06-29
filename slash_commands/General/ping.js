const { SlashCommandBuilder } = require('@discordjs/builders'); // Literally required.

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with pong!'),
	async run(client, interaction) {
		interaction.reply("pong!")
	},
};