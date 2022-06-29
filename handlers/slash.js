const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');
const { readdirSync } = require("fs");
const config = require("../config.json");
const ascii = require("ascii-table");
let table = new ascii("Slash Commands Handler");
table.setHeading('N°', 'COMMANDS:', 'STATUS:');
let cmd = [];

module.exports = (client) => {
	readdirSync("./slash_commands/").forEach(dir => {
		const commands = readdirSync(`./slash_commands/${dir}`).filter(file => file.endsWith(".js"));
		for (let file of commands) {
			const command = require(`../slash_commands/${dir}/${file}`);
			if (command.data.name) {
				cmd.push(command.data.toJSON());
				client.slash_commands.set(command.data.name, command);
				table.addRow(client.slash_commands.size, file, '🟩');
			} else {
				table.addRow(client.slash_commands.size, file, '🟥');
				continue;
			}
		}
	});

	const rest = new REST({ version: '9' }).setToken(process.env.TOKEN || config.client.TOKEN);

	(async () => {
		try {
            if (!config.client.ID) {
                    console.log("[WARN] You need to provide your client ID in config.json, so the slash commands will work!");
                    process.exit(1);      
            }
			if(!config.handlers.slash.TESTING_GUILD_ID) {
                console.log("[NOTE] Slash commands has been registered to public. If you want to make the slash commands for only one server, please provide the server id in config.json in the variable called TEST_GUILD_ID.")
				await rest.put(
					Routes.applicationCommands(config.client.ID),
					{ body: cmd },
				);
			} else {
                console.log("[NOTE] Slash commands has been registered for only one server. If you want to publish the slash commands for all the servers that your bot is in, remove the ID from TEST_GUILD_ID in config.json.")
				await rest.put(
					Routes.applicationGuildCommands(config.client.ID, config.handlers.slash.TESTING_GUILD_ID),
					{ body: cmd },
				);
			};

			console.log(table.toString());
			console.log(`[HANDLER] Successfully loaded ${client.slash_commands.size} slash commands!`);
		} catch (error) {
			console.error(error);
		}
	})();
}