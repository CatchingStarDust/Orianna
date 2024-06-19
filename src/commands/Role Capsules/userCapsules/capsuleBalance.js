const { ApplicationCommandOptionType } = require('discord.js');
const UserProfile = require('../../commands/schemas/UserProfile');
const getLocalCommands = require('../../../utils/getLocalCommands');

module.exports = {
    run: async ({ interaction }) => {
        if (!interaction.inGuild()) {
            interaction.reply({
                content: { needServerEmbed },
                ephemeral: true,
            })
            return;
        }
        const targetUserId = interaction.options.getUser('target-user')?.id || interaction.user.id;
        await interaction.deferReply();

        try {
            let userProfile = await userProfile.findOne({ userId: targetUserId });
            if (!userProfile) {
                userProfile = new UserProfile({ userId: targetUserId })
                interaction.editReply(
                    targetUserId === interaction.user.id`You have ${userProfile.balance} capsule(s)`
                )

            }

        } catch (error) {
            console.log(`There was an error: ${error}`)

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