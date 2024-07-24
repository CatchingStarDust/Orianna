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

            userProfile.capsulesOpened = (userProfile.capsulesOpened || 0) + 1;

            if (userProfile.capsulesOpened >= 100) {

                // Put role colour gacha function here, since the user has reached max pity

                await interaction.editReply(`CAPSULE OPENING EMBED`);
                userProfile.capsulesOpened = 0; 

            } else {

                // Proceed with gacha as normal
                await interaction.editReply(`NORMAL GACHA FUNCTION`);
            }

            if(!userProfile) {
                interaction.editReply(noCapsuleEmbed);

                await userProfile.save();
            }
            
        } catch (error) {
            console.log(`OOPS: ${error}`);
        }
    },
};

