const UserProfile = require('../../schemas/UserProfile');

const dailyAmmount = 1;

module.exports = {
    run: async ({ interaction }) => {
        // make sure people can only use this in the server
        if (!interaction.inGuild()) {
            interaction.reply({ content: `${needServerEmbed}`, ephemeral: true });
            return;
        }

        interaction.reply(`collecting dalies.`)

        try {
            await interaction.deferReply();

            let userProfile = await UserProfile.findOne({userId: interaction.member.id,});

        } catch (error) {
            console.log(`Error handling / daily: ${error}`);

        }
    },

    data: {
        name: 'daily',
        description: 'Gives you a capsule',
    },
};