const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const UserProfile = require('../schemas/UserProfile');
const { weightedRandomSelectItem } = require('../functions/colourWeightsRng.js');
const { getRemainingCooldownTime } = require('../functions/cooldownTimers.js');



const createNewProfile = async (userId) => {
    const newProfile = new UserProfile({
        userId: userId,
        lastDailyCollected: new Date(0), 
        lastTimePosted: new Date(0),
        capsulesOpened: 0, 
        coloursOwned: [],  // Explicitly set new profiles with empty arrays
        basicCapsules: 0,
    });
    await newProfile.save();
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-capsule')
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
            
            const remainingCooldown = getRemainingCooldownTime(serverMember.lastDailyCollected);
                if (remainingCooldown) {
                    const { hours, minutes } = remainingCooldown;
                    await interaction.editReply({ 
                        content: `You still have ${hours} hours and ${minutes} minutes remaining before you can claim another capsule.` 
                    });
                    return;
            }

            // Define the probabilities for each capsule type
            const capsuleWeights = [
                { type: '5 Basic Capsule', weight: 0.50 },  // 50% chance
                { type: '10 Basic Capsule', weight: 0.25 }, // 25% chance
                { type: '15 Basic Capsule', weight: 0.20 }, // 20% chance
                { type: '20 Basic Capsule', weight: 0.05 }  // 5% chance

            ];

            //default value for capsuels
            let capsuleAmount = 0;

            // Select a capsule type based on the defined weights
            const selectedCapsuleType = weightedRandomSelectItem(capsuleWeights);    


            switch (selectedCapsuleType) {
                case '5 Basic Capsule':
                    capsuleAmount = 5;
                    break;
                case '10 Basic Capsule':
                    capsuleAmount = 10;
                    break;
                case '15 Basic Capsule':
                    capsuleAmount = 15;
                    break;
                case '20 Basic Capsule':
                    capsuleAmount = 20;
                    break;
            }

            // Update the appropriate capsule count in the user's profile
            await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { 
                    $inc: { basicCapsules: capsuleAmount },
                    $set: { lastDailyCollected: new Date() }
                },
                { new: true, upsert: true },
                
            );

            // Correct reference to interaction.user
            const dailyCapsuleResultEmbed = new EmbedBuilder()
                .setColor("#ffe594")
                .setDescription(`<@${interaction.user.id}> has received ${selectedCapsuleType}s!`);
    
            await interaction.editReply({ embeds: [dailyCapsuleResultEmbed] });

        } catch (error) {
            console.error(`Error: ${error}`);
            await interaction.editReply({ content: `There was an error: ${error.message}`, ephemeral: true });
        }
    }
};