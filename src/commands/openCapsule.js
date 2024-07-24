const { SlashCommandBuilder } = require('discord.js');
const UserProfile = require('../schemas/UserProfile');
const capsuleData = require('../schemas/capsuleData');
const noCapsuleEmbed = require('embeds.js');

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
            
            let userProfile = await UserProfile.findOne({ userId: interaction.member.id });

            if(!userProfile) {
                interaction.editReply(noCapsuleEmbed);

                await userProfile.save();
            }
            
        } catch (error) {
            console.log(`OOPS: ${error}`);
        }
    },
};

