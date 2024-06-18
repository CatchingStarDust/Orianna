const { client, message } = require('discord.js');
const UserProfile = require('../../schemas/UserProfile');

function earnCapsule() {
    if (!LastDailyCapsuleCollected === 7)
        //script that gives capsule

}

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @returns
 */



module.exports = (client, message) => {
    if (!message.inGuild || message.author.bot()) return;
}