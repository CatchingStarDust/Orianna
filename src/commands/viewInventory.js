const { SlashCommandBuilder } = require('discord.js');
const UserProfile = require('../schemas/UserProfile');
const needServerEmbed = require('../embeds.js'); 
const createNewProfile = require('../functions/createNewProfile');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inventory')
        .setDescription('Check your inventory'),

    async execute(interaction) {

                await interaction.deferReply();

        try {

            //check if the user is in the guild
        if (!interaction.inGuild()) {
                interaction.editReply({ content: {needServerEmbed} });
                return;
            }
            
            // Find the user's profile in the database
            // If the profile does not exist, create a new one
        let serverMember = await UserProfile.findOne({ userId: interaction.user.id });

            if (!serverMember) {
                    createNewProfile();
                    await interaction.editReply(`New Profile created.`);
                } 

        const currentInventoryMessage = ` You have the following capsules in your inventory:
            - **Role Colours**: ${serverMember.coloursOwned.join(', ').replace(/, /g, ', ') || 0 }
            - **Basic Capsules**: ${serverMember.basicCapsules }
            - **Holiday Capsules**: ${serverMember.holidayCapsules}
            - **Autumn Capsules**: ${serverMember.autumnCapsules} `;

            await interaction.editReply(currentInventoryMessage);

            
        }catch (error) {
            console.log(`OOPS: ${error}`);
        }
    },
};


