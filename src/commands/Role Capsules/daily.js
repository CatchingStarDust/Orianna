const UserProfile = require('../../schemas/UserProfile');

const dailyAmmount = 1;

module.exports = {
    run: ({interaction}) => {
// make sure people can only use this in the server
        if (!interaction.inGuild()) {
            interaction.reply({needServerEmbed}, ephemeral: true,);
            return;
        },


        interaction.reply(`collecting dalies.`)
    },

    data: {
        name: 'daily',
        description: 'Gives you a capsule',
    },
};