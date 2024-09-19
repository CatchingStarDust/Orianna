//Main hub that connects command creation.


// libraries the bot needs access to
const { Client, GatewayIntentBits, Events, Partials, } = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


// if there is a new instance of the client being used (such as for events) it must be given intents
// (the bot needs permissions to do things)
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: 
            [Partials.Message,  
            Partials.Reaction,
            Partials.User,
    ],
});

client.on(Events.MessageReactionAdd, async (reaction, user) => {
    console.log('REACTION EVENT TRIGGERED'); 
    
    /**If it doesn't log this, the event listener might not be set up correctly.*/
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
        await mongoose.connect(process.env.MONGODB_URI,);
        console.log("Connected to the database");

        await client.login(process.env.TOKEN);
    } catch (error) {
        console.error(`Failed to connect to the database or login to Discord: ${error}`);
    }
})();