const { EmbedBuilder } = require('discord.js');

// generic embed for  responses
const genericEmbed = (title, description) => {
    return new EmbedBuilder()
        .setColor(0xff0000)
        .setTitle('Note')
        .setThumbnail(guildIcon)
        .setDescription(description)
        .addFields({ name: 'Note', value: 'Work in progress!' });
};

// Ori's error message reply embed
function errorMsgEmbed() {

// server icon
const guildIcon = interaction.guild.iconURL({ dynamic: true, size: 512 });

    return new EmbedBuilder()
        .setColor(0xff0000)
        .setTitle('Error')
        .setThumbnail(guildIcon)
        .setDescription(description)
        .addFields({ name: 'Error', value: `The Bot is angry... ${error.message}` });
};

module.exports = { genericEmbed, errorMsgEmbed, };