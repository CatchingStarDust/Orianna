const {ApplicationCommandOptionType } = require('discord.js');


module.exports = {
    run async ({ interaction }) => {
        interaction.reply('This is a test message')
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