const { SlashCommandBuilder } = require('@discordjs/builders');
const { UserProfile } = require('../schemas/UserProfile');
const { BasicCapsule, HolidayCapsule, AutumnCapsule } = require('../schemas/capsuleData');

// function to select a weighted random capsule type
function weightedRandomSelect(weights) {
    let sum = 0;
    const r = Math.random();

    for (let i = 0; i < weights.length; i++) {
        sum += weights[i].weight;
        if (r <= sum) {
            return weights[i].type;
        }
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Gives you your daily reward, including a random capsule!'),


    async execute(interaction) {

        const userId = interaction.member.id;
        
        let userProfile = await UserProfile.findOne({ userId });

        if (!userProfile) {
            userProfile = new UserProfile({ userId,}); 
        }

        const now = new Date();
        const lastDailyCollected = userProfile.lastDailyCollected || new Date(0);
        
        const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
        if (now - lastDailyCollected < oneDay) {
            await interaction.reply({ content: 'You have already collected your daily reward today!', ephemeral: true });
            return;
        }

        userProfile.lastDailyCollected = now;
        userProfile.capsules += 1;
        
        // Define the probabilities for each capsule type
        const capsuleWeights = [
            { type: 'BasicCapsule', weight: 0.50 },
            { type: 'HolidayCapsule', weight: 0.30 },
            { type: 'AutumnCapsule', weight: 0.20 }
        ];

        // Select a random capsule type based on weights
        const selectedCapsuleType = weightedRandomSelect(capsuleWeights);

        let newCapsule;
        switch (selectedCapsuleType) {
            case 'BasicCapsule':
                newCapsule = new basicCapsule({
                    username: interaction.user.username,
                    quantity: 1,
   
                });
                await newCapsule.save();
                userProfile.basicCapsules.push(newCapsule._id);
                break;
            case 'HolidayCapsule':
                newCapsule = new holidayCapsule({
                    username: interaction.user.username,
                    quantity: 1,

                });
                await newCapsule.save();
                userProfile.holidayCapsules.push(newCapsule._id);
                break;
            case 'AutumnCapsule':
                newCapsule = new autumnCapsule({
                    username: interaction.user.username,
                    quantity: 1,

                });
                await newCapsule.save();
                userProfile.autumnCapsules.push(newCapsule._id);
                break;
        }

        await userProfile.save();

        await interaction.reply({ content: `You have collected your daily reward and received a ${selectedCapsuleType}!`, ephemeral: true });
    },
};
