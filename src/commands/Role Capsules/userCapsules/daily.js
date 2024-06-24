const { SlashCommandBuilder } = require('@discordjs/builders');
const { UserProfile } = require('./schemas/UserProfile'); 
const basicCapsuleItem = require('../../commands/schemas/capsuleData');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Gives you a capsule'),


    async execute(interaction) {
        const dailyAmmount = 1;

// Ensure the command is used in a server
        if (!interaction.inGuild()) {
            await interaction.reply({ content: 'This command can only be used in a server.', ephemeral: true });
            return;
        }

        await interaction.deferReply(); 

        try {
            let commandUser = await UserProfile.findOne({ userId: interaction.member.id });

 // Check if the user has already collected their daily capsule
            if (commandUser) {
                const lastDailyDate = userProfile.lastDailyCollected?.toDateString();
                const currentDate = new Date().toDateString();

                if (lastDailyDate === currentDate) {
                    await interaction.editReply('You have already collected your reward for the day. Come back tomorrow.');
                    return;
                }
            } else {
                createNewUserProfile = new UserProfile({
                    userId: interaction.member.id,
                    capsules: 0, 
                });
            }

            userProfile[userId].capsules += dailyAmount;

 // This makes sure the bot knows that the user has offically collected their capsule for the day. It updates the date to the current day.           
            userProfile[userId].lastDailyCollected = new Date();
//Update the user's balance.
            await userProfile[userId].save();

            await interaction.editReply(`${dailyAmmount} capsule(s) were added to your inventory!\nYou now have ${userProfile.balance} capsule(s).`);
        } catch (error) {
            console.error(`Error handling /daily: ${error}`);
            await interaction.editReply('There was an error while processing your request.');
        }
    },
};
