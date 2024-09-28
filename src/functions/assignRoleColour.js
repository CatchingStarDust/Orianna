// where the bot gives users their colours
module.exports = (client) => {

    const {Events, EmbedBuilder } = require('discord.js');
    const ReactionPost = require('../schemas/roleColourData.js');
    const UserProfile = require('../schemas/UserProfile.js');
    
    /* when someone reacts 
    to a post with 
    the assigned emojis*/

    