# DISCORD.JS V14 HAS BEEN RELEASED.
This project is **no longer supported**, check the new repository for discord.js v14: https://www.github.com/TFAGaming/DiscordJS-V14-Bot-Template

# DiscordJS V13 Bot Template:
A simple discord bot project that is running with NodeJS and the package discord.js. Slash commands, prefix commands and events handler are ready. By the way, I have added a dynamic help command in ./commands/Information/help.js because I love you all :)

# Preview:
Gif invalid :(

# Requirements:
Engine: [NodeJS V16](https://nodejs.org/en/)<br>
IDE: [Repl.it](https://www.replit.com) or [Visual Studio Code](https://code.visualstudio.com/)<br>
Package Manager: [NPM](https://www.npmjs.com/)<br>
Required Packages: [discord.js@13.8.1](https://www.npmjs.com/package/discord.js/v/13.8.1) - [discord-api-types](https://www.npmjs.com/package/discord-api-types) - [@discordjs/rest](https://www.npmjs.com/package/@discordjs/rest)

### Why this project requires discord.js version 13.8.1 only?
Because in the future, things may change like some functions won't work anymore (Deprecated or removed). So, let's keep the DJS version 13.8.1 for now, and if there is another version compatible with this project, then we will update this project with a new version.

# Setup:
### Install packages:
Type in shell of your IDE: `npm install`
### Run the project:
Type in the terminal or shell of your IDE `node .` or `node index.js`.
# Features:
Click on the select menu below to view available features on this project.
<details><summary>Click here!</summary>
  
| Features             | Availability | 
| -------------------- | ------------ |
| Prefix Cmds Handler  |     ✅       |
| Slash Cmds Handler   |     ✅       |
| Events Handler       |     ✅       |
| MongoDB              |     ❌       |
| Custom Prefix        |     ❌       |
</details>

# How it works:
### Slash commands handler:
#### Why the `ID` of my client is always required?
This variable is required for slash commands handler, so the project can register the slash commands to Discord and to the Bot.

#### What is `TESTING_GUILD_ID`? And why do we need it?
The variable `TESTING_GUILD_ID` will makes the project to **register** new slash commands on **Discord** and to **the server** id that you've set. If the server id is not found in `TESTING_GUILD_ID` in config.json, then the project will **register** new slash commands to **Discord** and to **all Discord servers** that's your bot in.

# Credits:
This project was made by T.F.A#7524. If you want to share this project for your friends or public, please give credits to me or this will end in a copyright warning. Thank you!
