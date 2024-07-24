const { SlashCommandBuilder } = require('discord.js');
const UserProfile = require('../schemas/UserProfile');
const needServerEmbed = require('embeds.js');

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
            if (!userProfile) {

                userProfile = new UserProfile({ userId: interaction.member.id });
                await userProfile.save();

            }
            interaction.editReply(`You have ${userProfile.capsules || 0} capsule(s)`);
        } catch (error) {
            console.log(`OOPS: ${error}`);
        }
    },
};

