const {ApplicationCommandOptionType } = require('discord.js');


module.exports = {

    data: {
        name: 'Inventory',
        description: "Check your inventory",
        options: [
            {
                name: 'target-user',
                description: "The user who's inventory you want to see"
                type: ApplicationCommandOptionType.User
            }
        ]
    }
}