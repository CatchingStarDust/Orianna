const { ApplicationCommandOptionType, PermissionFlagBits } = require('discord.js')

module.exports = {
    name: 'ban',
    description: 'Bans a member from the server',
    // devOnly: boolean,
    // testOnly: boolean,
    options: [
        {
            name: 'target-user',
            description: 'The user to ban',
            required: true,
            type: ApplicationCommandOptionType.mentionable,
        },

        {
            name: 'reason',
            description: 'The reason for banning',
            type: ApplicationCommandOptionType.string,
        },
    ],

    permissionsRequired: [PermissionFlagBits.Administrator],
    botPermissions: [PermissionFlagBits.Bots],

    callback: (client, interaction) => {
        interaction.reply('ban...');
    },

};
