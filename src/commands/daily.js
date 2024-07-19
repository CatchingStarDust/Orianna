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
            console.log('Fetching user profile for user ID:', interaction.member.id); // Debug log

            let userProfile = await UserProfile.findOne({ userId: interaction.member.id });

            // Check if the user has already collected their daily capsule
            if (userProfile) {
                const lastDailyDate = userProfile.lastDailyCollected?.toDateString();
                const currentDate = new Date().toDateString();

                if (lastDailyDate === currentDate) {
                    console.log('User has already collected their daily reward.'); // Debug log
                    await interaction.editReply('You have already collected your reward for the day. Come back tomorrow.');
                    return;
                }
            } else {
                console.log('No existing user profile found. Creating a new one.'); // Debug log
                userProfile = new UserProfile({
                    userId: interaction.member.id,
                    capsules: 0, 
                });
            }

            userProfile.capsules += dailyAmount;
            userProfile.lastDailyCollected = new Date();

            await userProfile.save();

            console.log('User profile updated and saved.'); // Debug log

            await interaction.editReply(`${dailyAmount} capsule(s) were added to your inventory!\nYou now have ${userProfile.capsules} capsule(s).`);
        } catch (error) {
            console.error(`Error handling /daily: ${error}`);
            await interaction.editReply('There was an error while processing your request.');
        }
    },
};
