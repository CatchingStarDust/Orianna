require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        // Add other intents here
    ],
});

//this initializes an event listener
client.on('ready', (c) => {
    console.log('We go.')
});


client.on('messageCreate', (message) => {
    //if the person sending the message is a bot, DON'T DO SHIT!!!!
    if (message.author.bot) {
        return;
    }

    if (message.content === 'ping') {
        message.reply('pong');
    }
});

client.login(process.env.TOKEN);