const { userId, message } = require('discord.js');

//calculates the droprate of the chat-earnable capsules

async function dropCapsule() {
    try {
        const jackpot = 10.0;

        const n = Math.random();
        const result = n * 100;

        // Check if the result is less than the jackpot
        if (result < jackpot) {
            return "Jackpot!";
        } else {
            return "No Jackpot!";
        }
    } catch (error) {
        console.log(`OOPS: "${error}"`);
    }
}

module.exports = { dropCapsule };