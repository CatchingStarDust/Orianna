const { SlashCommandBuilder } = require('discord.js');
const UserProfile = require('../schemas/UserProfile');
const needServerEmbed = require('../embeds.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('opencapsule')
        .setDescription('open a capsule'),

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


            userProfile.capsulesOpened = (userProfile.capsulesOpened || 0) + 1;


            // if the user is max pity
            if (userProfile.capsulesOpened >= 50) {

                // Put role colour gacha function here, since the user has reached max pity

                await interaction.editReply(`ROLE COLOUR GACHA`);
                userProfile.capsulesOpened = 0; 

                await userProfile.save();     
            }
                
            
            // Proceed with gacha as normal2
                

            await userProfile.save();
            
        } catch (error) {
            console.log(`OOPS: ${error}`);
            
        }
    },
};
