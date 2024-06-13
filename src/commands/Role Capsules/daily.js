const {ApplicationCommandOptionType } = require('discord.js')
const UserProfile = require('../../schemas/UserProfile');

const dailyAmmount = 1;

module.exports = {
    run: async ({ interaction }) => {
        // make sure people can only use this in the server
        if (!interaction.inGuild()) {
            interaction.reply({ content: `${needServerEmbed}`, ephemeral: true });
            return;}

        interaction.reply(`collecting dalies.`)

        try {
            await interaction.deferReply();

            let userProfile = await UserProfile.findOne({userId: interaction.member.id,});

// Check to see if member already collected their Capsule for the day
            if (userProfile) {
                const lastDailyDate = userProfile.lastDailyCollected?.toDateString();
                const currentDate = new Date().toDateString();

                if (lastDailyDate === currentDate) {
                    interaction.reply(`You have already collected your reward for the day. Come back tomorrow.`);
                    return;}

            }else {
                userProfile = new UserProfile ({
                    userId: interaction.member.id,});
            }

        userProfile.balance += dailyAmmount;
        userProfile.lastDailyCollected = new Date();

        await userProfile.save();
        
        interaction.reply(
            `${dailyAmmount} was added to your inventory!\nYou have ${userProfile.balance} capsule(s)`);

        } catch (error) {
            console.log(`Error handling / daily: ${error}`);}
    },

    data: {
        name: 'daily',
        description: 'Gives you a capsule',},
};