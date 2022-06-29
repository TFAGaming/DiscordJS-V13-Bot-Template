const client = require('../../index.js');
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.slash_commands.get(interaction.commandName);

    if (!command) return interaction.reply({ content: "This command is invalid, probably the developer has removed it.", ephemeral: true });

    try {
        await command.run(client, interaction);
    } catch (e) {

        function id(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() *
                    charactersLength));
            }
            return result;
        }

        const i = id(12);

        console.error(`[ERROR] Error ID: ${i}\n ` + e);

        await interaction.reply({ content: `Something went wrong while executing the command! Here is the error ID that you can report it to the developers: \`${i}\``, ephemeral: true });
    }
});