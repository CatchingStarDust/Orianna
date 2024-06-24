const { SlashCommandBuilder } = require('@discordjs/builders');
const { UserProfile } = require('./schemas/UserProfile'); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Gives you a capsule'),

    async execute(interaction) { // Change message and args to interaction
        const dailyAmount = 1;

        // Ensure the command is used in a server
        if (!interaction.inGuild()) {
            await interaction.reply({ content: 'This command can only be used in a server.', ephemeral: true });
            return;
        }

        await interaction.deferReply(); 

        try {
            let userProfile = await UserProfile.findOne({ userId: interaction.member.id });

            // Check if the user has already collected their daily capsule
            if (userProfile) {
                const lastDailyDate = userProfile.lastDailyCollected?.toDateString();
                const currentDate = new Date().toDateString();

                if (lastDailyDate === currentDate) {
                    await interaction.editReply('You have already collected your reward for the day. Come back tomorrow.');
                    return;
                }
            } else {
                userProfile = new UserProfile({
                    userId: interaction.member.id,
                    capsules: 0, 
                });
            }

            userProfile.capsules += dailyAmount;

            // This makes sure the bot knows that the user has officially collected their capsule for the day. It updates the date to the current day.           
            userProfile.lastDailyCollected = new Date();
            // Update the user's balance.
            await userProfile.save();

            await interaction.editReply(`${dailyAmount} capsule(s) were added to your inventory!\nYou now have ${userProfile.capsules} capsule(s).`);
        } catch (error) {
            console.error(`Error handling /daily: ${error}`);
            await interaction.editReply('There was an error while processing your request.');
        }
    },
};
