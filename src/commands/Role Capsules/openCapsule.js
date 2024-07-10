const { SlashCommandBuilder } = require('@discordjs/builders');
const { UserProfile } = require('./schemas/UserProfile'); 
const UserProfile = require('../../commands/schemas/UserProfile');
const capsuleData = require('../../commands/schemas/capsuleData');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('open capsule')
        .setDescription('Open an capsules you have'),

    async execute(interaction) {
        try {
            await interaction.deferReply();

            // Check to see if the user has a capsule to open 
            let userProfile = await UserProfile.findOne({ userId: interaction.member.id });
            let capsuleColor = await capsuleData.findOne({ userId: interaction.member.id });

            if (!userProfile || !userProfile.capsules || userProfile.capsules.length === 0) {
                await interaction.editReply('You have no capsules to open.');
                return;
            }

            // If the user has capsules,
            const capsuleBalance = userProfile.capsules.toCapsulesNumber();

            // subtract a capsule
            userProfile.capsules = capsuleBalance - 1;
            await userProfile.save();

            //continue with the rest of the gacha
            const roll = Math.floor(Math.random() * 64) + 1;
            const jackpot = roll === 1; // Only 1 is the jackpot

            //display result
            await interaction.reply({ embeds: [openCapsuleResults] });  

        } catch (error) {
            console.log(`OOPS: "${error}"`);
            await interaction.editReply('There was an error trying to open the capsule.');
        }
    }
};

