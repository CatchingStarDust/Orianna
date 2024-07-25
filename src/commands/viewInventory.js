const { SlashCommandBuilder, InteractionResponseType } = require('discord.js');
const UserProfile = require('../schemas/UserProfile');
const capsuleData = require('../schemas/capsuleData');
const noCapsuleEmbed = require('../embeds.js');

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

            let userCapsules = await UserProfile.findOne({ capsules: Number });

            if (userCapsules.Number = 0) {
                await interaction.editReply(`You don't have any capsules to open.`);
                return;
            }

            interaction.editReply(`You have ${userProfile.capsules || 0} capsule(s)`);

            
            
            
        }catch (error) {
            console.log(`OOPS: ${error}`);
        }
    },
};


