require('dotenv').config();

// libraries the bot needs access to
const fs = require('node:fs');
const path = require('node:path');

const { Client, GatewayIntentBits, EmbedBuilder, Events, InteractionResponseType, } = require('discord.js');
const { genericEmbed, errorMsgEmbed, needServerEmbed } = require('./embeds');
const mongoose = require('mongoose');

// where intents go (the bot needs permissions to do things)
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        // Add other intents here
    ],
});

// signals that Ori is online
client.once(Events.ClientReady, () => {
    console.log(`${client.user.tag} has arrived. We go.`);
});

//retreive command files
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// signals that Ori is connected to the Mongoose database
(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to the database");

        await client.login(process.env.TOKEN);
    } catch (error) {
        console.error(`Failed to connect to the database or login to Discord: ${error}`);
    }
})();