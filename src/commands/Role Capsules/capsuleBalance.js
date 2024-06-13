const {ApplicationCommandOptionType } = require('discord.js');
const UserProfile = require('../../schemas/UserProfile')

module.exports = {
    run: async ({ interaction }) => {
        if (!interaction.inGuild()) {
            interaction.reply({
               content: needServerEmbed,
                ephemral: true,
            })
            return;
        }
        const targetUserId = interaction.options.getUser('target-user')?.id || interaction.user.id;
        await interaction.DeferReply();

        try {
            let userProfile = await userProfile.fineOne({userId: targetUserId});
            if (!userProfile) {
                userProfile = new userProfile({userId: targetUserId});
            }

        } catch (error) {
            console.log((`There was an error: ${error}`))

        }
    },

    data: {
        name: 'Inventory',
        description: "Check your inventory",
        options: [
            {
                name: 'target-user',
                description: "The user who's inventory you want to see",
                type: ApplicationCommandOptionType.User,
            },
        ],
    },
};