const { SlashCommandBuilder } = require('@discordjs/builders');
const UserProfile = require('../schemas/UserProfile');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Gives you a capsule'),

    async execute(interaction) { 
        const dailyAmount = 1;

        // Ensure the command is used in a server
        if (!interaction.inGuild()) {
            await interaction.reply({ content: 'This command can only be used in a server.', ephemeral: true });
            return;
        }

        await interaction.deferReply(); 

        try {
            console.log('Fetching user profile for user ID:', interaction.member.id); 

            let userProfile = await UserProfile.findOne({ userId: interaction.member.id });

            let twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

            // Function to calculate remaining time until next collection
            function getRemainingTime(lastCollected) {
                if (!lastCollected) return null;

                const now = new Date();
                const nextCollectionTime = new Date(lastCollected.getTime() + twentyFourHours);
                const remainingTime = nextCollectionTime - now;

                if (remainingTime <= 0) {
                    return null;
                }

                const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
                const seconds = Math.floor((remainingTime / 1000) % 60);

                return { hours, minutes, seconds }; // Return an object with hours, minutes, and seconds
            }

            // Check if the user has already collected their daily capsule
            if (userProfile) {
                const remainingTime = getRemainingTime(userProfile.lastDailyCollected); // Calculate remaining time

                if (remainingTime) {
                    const { hours, minutes, seconds } = remainingTime; 
                    console.log('User has already collected their daily reward.');
                    await interaction.editReply(`You have already collected your reward for the day. You can collect another in ${hours}h ${minutes}m ${seconds}s.`);
                    return;
                }
            } else {
                console.log('No existing user profile found. Creating a new one.');
                userProfile = new UserProfile({
                    userId: interaction.member.id,
                    capsules: 0, 
                });
            }

            userProfile.capsules += dailyAmount;
            userProfile.lastDailyCollected = new Date();

            await userProfile.save();

            console.log('User profile updated and saved.'); 

            await interaction.editReply(`${dailyAmount} capsule(s) were added to your inventory!\nYou now have ${userProfile.capsules} capsule(s).`);
        } catch (error) {
            console.error(`Error handling /daily: ${error}`);
            await interaction.editReply('There was an error while processing your request.'); 
        }
    },
};
