const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");
const { readdirSync } = require("fs");
const wait = require('node:timers/promises').setTimeout;
const config = require("../../config.json");

module.exports = {
    name: 'help',
    aliases: [],
    category: "Information",
    description: "Shows a list of commands and their functionalities.",
    usage: "help [command]",
    examples: ["help ping", "help avatar", "help mute"],
    run: async (client, message, args, prefix) => {
        if (!args[0]) {

            // Embed:
            const embed = new MessageEmbed()
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
                .setDescription("Please select a category from the selection menu given below to view commands.")
                .setFooter({ text: `More info about a command: ${prefix}help [command]` });

            // Prefix commands menu:
            const rowMenu = new MessageActionRow()
                .addComponents([
                    new MessageSelectMenu()
                        .setCustomId("help-menu")
                        .setPlaceholder("Click here to select a category")
                        .addOptions([
                            client.categories.map((cat) => {
                                return {
                                    label: `${cat[0].toUpperCase() + cat.slice(1)}`,
                                    value: cat
                                }
                            })
                        ])
                ]);

            message.reply({ embeds: [embed], components: [rowMenu] }).then(async (msg) => {

                // Select menu collector:
                const filter = i => i.user.id === message.member.id;
                const collector = await msg.createMessageComponentCollector({
                    filter: filter,
                    type: "SELECT_MENU"
                });
                collector.on('collect', async (col) => {
                    await col.deferUpdate().catch(() => { });

                    try {
                        const [directory] = col.values;

                        const embedCommand = new MessageEmbed()
                            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
                            .setTitle(`Category: ${directory}`)
                            .setDescription(`The current prefix for **${message.guild.name}** is \`${prefix}\``)
                            .addFields(
                                client.commands.filter(cmd => cmd.category === directory).map((cmd) => {
                                    if (cmd) {
                                        return {
                                            name: `${cmd.name ? `\`${prefix}${cmd.name}\`:` : "unknown.js"} ${message.member.permissions.has(cmd.permissions || []) ? "" : "[Staff Members Only]"}`,
                                            value: `${cmd.description ? `${cmd.description}` : "> No description for that command."}`,
                                        }
                                    } else {
                                        return {
                                            name: `No commands for this directory.`,
                                            value: `** **`
                                        }
                                    }
                                })
                            );

                        msg.edit({ embeds: [embedCommand], components: [rowMenu] });
                    } catch (e) {

                    }
                });

            });

            // if {prefix}help (command):
        } else {

            const command =
                client.commands.get(args[0].toLowerCase()) ||
                client.commands.find(
                    (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
                );

            if (!command) {
                const embed = new MessageEmbed()
                    .setDescription(`Couldn't find that command, try to run the command \`${prefix}help\`.`)
                    .setColor("RED");

                return message.reply({ embeds: [embed] }).then(async (timeout) => {
                    await wait(5000);
                    message.delete().catch(() => { });
                    timeout.delete().catch(() => { });
                })

            } else {

                const embed = new MessageEmbed()
                    .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                    .setTitle(`Command information: ${prefix}${command.name}`)
                    .addFields(
                        { name: "Command description", value: command.description ? command.description : "[No description for this command]", inline: true },
                        { name: "Command aliase(s)", value: command.aliases ? `${command.aliases.map(al => `\`${prefix}${al}\``).join(", ") || "[No aliases for this command]"}` : "[No aliases for this command]", inline: true },
                        { name: "Command category", value: command.category ? `${command.category}` : "[No category for this command]", inline: true },
                        { name: "Command usage", value: command.usage ? `\`${prefix}${command.usage}\`` : `[No usage for this command]`, inline: true },
                        { name: "Command example(s)", value: command.examples.map(cmd => `\`${prefix}${cmd}\``).join(" | ") || "[No examples for this command]", inline: false },
                    )
                    .setColor("BLUE");

                return message.reply({ embeds: [embed] });

            }
        }
    }
}