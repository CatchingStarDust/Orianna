require('dotenv').config();
const opggApi = require('op.gg-api/client.js');
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { genericEmbed, errorMsgEmbed } = require('./embeds');
const eventHandler = require('./handlers/eventHandlers.js');

//--------------------------------------------------
//  where intents go (the bot needs permissions to do things)
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        // Add other intents here
    ],
});

eventHandler(client);

client.login(process.env.TOKEN);