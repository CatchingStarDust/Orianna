const { SlashCommandBuilder } = require('@discordjs/builders');
const UserProfile = require('../schemas/UserProfile');
const createNewProfile = require('../functions/createNewProfile');
const weightedRandomSelect = require('../functions/weightedRandomSelect');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Gives you your daily reward, including a random capsule!'),

    async execute(interaction) {

        await interaction.deferReply();

        try {
            // Find the user's profile in the database
            let serverMember = await UserProfile.findOne({ userId: interaction.user.id });

            // If the profile does not exist, create a new one
            if (!serverMember) {
                createNewProfile(interaction.user.id);
            } 

            /* const now = new Date();
            const lastDailyCollected = serverMember.lastDailyCollected || new Date(0);
            const twentyFourHours = 24 * 60 * 60 * 1000;

            // Check if the user has already collected their daily reward
            if (now - lastDailyCollected < twentyFourHours) {
                await interaction.editReply({ content: 'You have already collected your daily reward today!', ephemeral: true });
                return;
            }
            
            // Update the last daily collection time
            serverMember.lastDailyCollected = now; */

            // Define the probabilities for each capsule type
            const capsuleWeights = [
                { type: 'Basic Capsule', weight: 0.50 },
                { type: 'Holiday Capsule', weight: 0.30 },
                { type: 'Autumn Capsule', weight: 0.20 }
            ];

            // Select a capsule type based on the defined weights
            const selectedCapsuleType = weightedRandomSelect(capsuleWeights);     

            // Update the appropriate capsule count in the user's profile
            switch(selectedCapsuleType){
                case 'Basic Capsule': {
                    await UserProfile.findOneAndUpdate(
                        { userId: serverMember.userId },
                        { $inc: { basicCapsules: 1 } },
                        { new: true, upsert: true }
                    )}
                    break;
                case 'Holiday Capsule': {
                    await UserProfile.findOneAndUpdate(
                        { userId: serverMember.userId },
                        { $inc: { holidayCapsules: 1 } },
                        { new: true, upsert: true }    
                    )}
                    break;
                case 'Autumn Capsule': {
                    await UserProfile.findOneAndUpdate(
                        { userId: serverMember.userId },
                        { $inc: { autumnCapsules: 1 } },
                        { new: true, upsert: true }    
                    )}
                    break;
        
                    }

            // Save the updated user profile
            await serverMember.save();

            await interaction.editReply({ content: `You have collected your daily reward and received a ${selectedCapsuleType}!` });

        } catch (error) {
            console.error(`Error: ${error}`);
            await interaction.editReply({ content: `There was an error: ${error.message}`, ephemeral: true });
        }
    }
};
