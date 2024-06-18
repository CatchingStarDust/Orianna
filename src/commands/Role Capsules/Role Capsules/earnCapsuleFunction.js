const { userId, message } = require('discord.js');
const UserProfile = require('../../schemas/UserProfile');
const BasicCapsule = require('../../../schemas/BasicCapsule.js');

async function giveDailyCapsule(userId) {
    try {
        const user = await User.findById(userId);
        if (!message.inGuild || message.author.bot())
            return;

        if (!user) {
            throw new Error(`The Ball is angry...: ${error}`);
        }

        user.dailyCount += 1;

        const newCapsule = new BasicCapsule();

        await newCapsule.save();

        user.capsules.push(newCapsule);

        // Save update
        await user.save();

        console.log(`Daily function has been run ${user.dailyCount} times.`);
    } catch (error) {
        console.error('Error in earnCapsuleFunction:', error);
    }
}

module.exports = giveDailyCapsule;