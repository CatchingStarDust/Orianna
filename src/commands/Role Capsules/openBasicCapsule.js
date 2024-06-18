const User = require('../../schemas/UserProfile');
const BasicCapsule = require('../../schemas/BasicCapsule');

function async openBasicCapsule(userId) {
    const user = await User.findById(userId);
    if (!user) {
        interaction.reply(`There was an error: ${error}`)
    }


    return roleColors[Math.floor(Math.random() * roleColors.length)];
}