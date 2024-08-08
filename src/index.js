//Main hub that connects command creation.

require('dotenv').config();

// libraries the bot needs access to
const { Client, GatewayIntentBits, Events } = require('discord.js');
const { genericEmbed, errorMsgEmbed, needServerEmbed } = require('./embeds');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

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

client.commands = new Map();

// Imports command files 
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(__dirname, 'commands', file));
    if (!command.data || !command.data.name) {
        console.error(`The command at ${file} is missing a 'data' property or 'name'.`);
        continue;
    }
    client.commands.set(command.data.name, command);
}

// signals that Ori is online
client.once(Events.ClientReady, () => {
    console.log(`${client.user.tag} has arrived. We go.`);
});

// handles command interactions
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error executing command: ${error}`);
        await interaction.reply({ content: 'There was an error executing this command.', ephemeral: true });
    }
});

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
