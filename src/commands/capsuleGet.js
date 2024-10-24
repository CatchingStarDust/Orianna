const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const UserProfile = require('../schemas/UserProfile.js');
const { getRemainingCooldownTime } = require('../functions/cooldownTimers.js');

const weightedRandomSelect = function weightedRandomSelect(weights) {
    // Get the total sum of all weights
    const totalWeight = weights.reduce((sum, item) => sum + item.weight, 0);

    // Generate a random number between 0 and totalWeight
    const r = Math.random() * totalWeight;

    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
        sum += weights[i].weight;
        if (r <= sum) {
            return weights[i].type;
        }
    }
};


const createNewProfile = async (userId) => {
    const newProfile = new UserProfile({
        userId: userId,
        lastDailyCollected: new Date(0), 
        lastTimePosted: new Date(0),
        capsulesOpened: 0, 
        coloursOwned: [],  // Explicitly set new profiles with empty arrays
        holidayCapsules: 0, 
        autumnCapsules: 0 
    });
    await newProfile.save();
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-capsule')
        .setDescription('Gives you a random capsule!'),

    async execute(interaction) {

        await interaction.deferReply();

        try {
            // Find the user's profile in the database
            let serverMember = await UserProfile.findOne({ userId: interaction.user.id });

            // If the profile does not exist, create a new one and retrieve it again
            if (!serverMember) {
                await createNewProfile(interaction.user.id);  // Create a new profile
                serverMember = await UserProfile.findOne({ userId: interaction.user.id });  // Fetch the created profile
                await interaction.editReply(`New Profile created.`);
            }

            const remainingCooldown = getRemainingCooldownTime(serverMember.lastDailyCollected);

            if (remainingCooldown) {
                return interaction.editReply(
                        `You need to wait ${remainingCooldown.hours} hours and ${remainingCooldown.minutes} minutes before you can get another capsule.`
                );
            }


            // Define the probabilities for each capsule type
            const capsuleWeights = [
                { type: '5 Basic Capsule', weight: 0.20 },  // 20% chance
                { type: '10 Basic Capsule', weight: 0.05 }, // 5% chance
                { type: '15 Basic Capsule', weight: 0.10 }, // 10% chance
                { type: '20 Basic Capsule', weight: 0.15 }, // 15% chance
                { type: '5 Autumn Capsule', weight: 0.20 }, // 20% chance
                { type: '10 Autumn Capsule', weight: 0.05 }, // 5% chance
                { type: '15 Autumn Capsule', weight: 0.10 }, // 10% chance
                { type: '20 Autumn Capsule', weight: 0.15 }, // 15% chance
            ];

            // Select a capsule type based on the defined weights
            const selectedCapsuleType = weightedRandomSelect(capsuleWeights);     

            // Update the appropriate capsule count in the user's profile
            switch(selectedCapsuleType){
                case '5 Basic Capsule': {
                    await UserProfile.findOneAndUpdate(
                        { userId: serverMember.userId },
                        { $inc: { basicCapsules: 5  } },
                        { new: true, upsert: true }
                    )}
                    break;
                case '10 Basic Capsule': {
                    await UserProfile.findOneAndUpdate(
                        { userId: serverMember.userId },
                        { $inc: { basicCapsules: 10  } },
                        { new: true, upsert: true }
                    )}
                    break;
                case '15 Basic Capsule': {
                    await UserProfile.findOneAndUpdate(
                        { userId: serverMember.userId },
                        { $inc: { basicCapsules: 15 } },
                        { new: true, upsert: true }
                     )}
                    break;
                case '20 Basic Capsule': {
                    await UserProfile.findOneAndUpdate(
                        { userId: serverMember.userId },
                        { $inc: { basicCapsules: 20 } },
                         { new: true, upsert: true }
                     )}
                    break;
                case '5 Autumn Capsule': {
                    await UserProfile.findOneAndUpdate(
                        { userId: serverMember.userId },
                        { $inc: { autumnCapsules: 5 } },
                        { new: true, upsert: true }
                    )}
                    break;
                case '10 Autumn Capsule': {
                    await UserProfile.findOneAndUpdate(
                        { userId: serverMember.userId },
                        { $inc: { autumnCapsules: 10 } },
                        { new: true, upsert: true }
                    )}
                    break;
                case '15 Autumn Capsule': {
                    await UserProfile.findOneAndUpdate(
                         { userId: serverMember.userId },
                         { $inc: { autumnCapsules: 15 } },
                         { new: true, upsert: true }
                     )}
                    break;
                case '20 Autumn Capsule': {
                     await UserProfile.findOneAndUpdate(
                          { userId: serverMember.userId },
                          { $inc: { autumnCapsules: 20 } },
                          { new: true, upsert: true }
                    )}
                    break;
            }

            // Save the updated user profile
            serverMember.lastDailyCollected = new Date();
            await serverMember.save();

            // Correct reference to interaction.user
            const CapsuleGetEmbed = new EmbedBuilder()
                .setColor("#ffe594")
                .setTitle('CAPSULE GET!')
                .setDescription(`<@${interaction.user.id}> found ${selectedCapsuleType}s!`);
    
            await interaction.editReply({ embeds: [CapsuleGetEmbed] });

        } catch (error) {
            console.error(`Error: ${error}`);
            await interaction.editReply({ content: `There was an error: ${error.message}`, ephemeral: true });
        }
    }
};

module.exports.weightedRandomSelect = weightedRandomSelect;
module.exports.createNewProfile = createNewProfile;