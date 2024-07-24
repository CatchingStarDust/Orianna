const { SlashCommandBuilder } = require('discord.js');
const UserProfile = require('../schemas/UserProfile');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inventory')
        .setDescription('Check your inventory'),

    async execute(interaction) {
        if (!interaction.inGuild()) {
            const needServerEmbed = {
                title: "This command can only be used in a server",
                description: "Please use this command in a server.",
                color: 0xff0000
            };
            interaction.reply({
                embeds: [needServerEmbed],
                ephemeral: true,
            });
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
            interaction.editReply('An error occurred while fetching your inventory.');
        }
    },
};

