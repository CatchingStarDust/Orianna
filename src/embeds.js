const { EmbedBuilder } = require('discord.js');

// generic embed for  responses
const genericEmbed = (title, description) => {
    return new EmbedBuilder()
        .setColor(0xff0000)
        .setTitle(`title`)
        .setThumbnail({guildIcon})
        .setDescription(description)
        .addFields({value: 'Work in progress!'});
};

// Ori's error message reply embed
const errorMsgEmbed = (title, description) => {
    return new EmbedBuilder()
        .setColor(0xff0000)
        .setTitle(`title`)
        .setThumbnail({guildIcon})
        .setDescription(description)
        .addFields({value: `The Bot is angry... ${error.message}`});
};

module.exports = { genericEmbed, errorMsgEmbed,};