const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const UserProfile = require('../schemas/UserProfile');

const weightedRandomSelect = function weightedRandomSelect(weights) {
    let sum = 0;
    const r = Math.random();

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
        .setName('daily')
        .setDescription('Gives you your daily reward, including a random capsule!'),

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

            //default value for capsuels
            let capsuleAmount  = 5; 

            // Select a capsule type based on the defined weights
            const selectedCapsuleType = weightedRandomSelect(capsuleWeights);     

            // Update the appropriate capsule count in the user's profile
            switch(selectedCapsuleType){
                case '5 Basic Capsule': {
                    capsuleAmount  = 5;
                    await UserProfile.findOneAndUpdate(
                        { userId: serverMember.userId },
                        { $inc: { basicCapsules: capsuleAmount  } },
                        { new: true, upsert: true }
                    )}
                    break;
                case '10 Basic Capsule': {
                    capsuleAmount  = 10;
                    await UserProfile.findOneAndUpdate(
                        { userId: serverMember.userId },
                        { $inc: { basicCapsules: capsuleAmount  } },
                        { new: true, upsert: true }
                    )}
                    break;
                case '15 Basic Capsule': {
                    capsuleAmount = 15;
                    await UserProfile.findOneAndUpdate(
                        { userId: serverMember.userId },
                        { $inc: { basicCapsules: capsuleAmount } },
                        { new: true, upsert: true }
                     )}
                    break;
                case '20 Basic Capsule': {
                    capsuleAmount = 20;
                    await UserProfile.findOneAndUpdate(
                        { userId: serverMember.userId },
                        { $inc: { basicCapsules: capsuleAmount } },
                         { new: true, upsert: true }
                     )}
                    break;
                case '5 Autumn Capsule': {
                    capsuleAmount = 5;
                    await UserProfile.findOneAndUpdate(
                        { userId: serverMember.userId },
                        { $inc: { autumnCapsules: capsuleAmount } },
                        { new: true, upsert: true }
                    )}
                    break;
                case '10 Autumn Capsule': {
                    capsuleAmount = 10;
                    await UserProfile.findOneAndUpdate(
                        { userId: serverMember.userId },
                        { $inc: { autumnCapsules: capsuleAmount } },
                        { new: true, upsert: true }
                    )}
                    break;
                case '15 Autumn Capsule': {
                    capsuleAmount = 15;
                    await UserProfile.findOneAndUpdate(
                         { userId: serverMember.userId },
                         { $inc: { autumnCapsules: capsuleAmount } },
                         { new: true, upsert: true }
                     )}
                    break;
                case '20 Autumn Capsule': {
                    capsuleAmount = 20;
                     await UserProfile.findOneAndUpdate(
                          { userId: serverMember.userId },
                          { $inc: { autumnCapsules: capsuleAmount } },
                          { new: true, upsert: true }
                    )}
                    break;
            }

            // Save the updated user profile
            await serverMember.save();

            // Correct reference to interaction.user
            const dailyCapsuleResultEmbed = new EmbedBuilder()
                .setColor("#ffe594")
                .setDescription(`<@${interaction.user.id}> has collected their daily reward and received ${capsuleAmount} ${selectedCapsuleType}s!`);
    
            await interaction.editReply({ embeds: [dailyCapsuleResultEmbed] });

            /** if the user gets multiple capsules*/
            switch(selectedCapsuleType) {

            }

        } catch (error) {
            console.error(`Error: ${error}`);
            await interaction.editReply({ content: `There was an error: ${error.message}`, ephemeral: true });
        }
    }
};

module.exports.weightedRandomSelect = weightedRandomSelect;
module.exports.createNewProfile = createNewProfile;