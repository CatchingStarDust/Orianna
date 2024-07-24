const { ApplicationCommandOptionType } = require('discord.js');
const UserProfile = require('../schemas/UserProfile');
const capsuleData = require('../schemas/capsuleData');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inventory')
        .setDescription('Check your inventory'),

    async execute(interaction) {
        if (!interaction.inGuild()) {

            interaction.reply({needServerEmbed});

            return;
        }
        await interaction.deferReply();

        try {
            
            interaction.editReply();
            
        } catch (error) {
            console.log(`OOPS: ${error}`);
            interaction.editReply('An error occurred while fetching your inventory.');
        }
    },
};

