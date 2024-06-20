require('dotenv').config();
//libraries the bot needs access to
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { genericEmbed, errorMsgEmbed, needServerEmbed } = require('./embeds');
const mongoose = require('mongoose');

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

//making an IFIE for the database
(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to the database");
    client.login(process.env.TOKEN);
})();


client.login(process.env.TOKEN);