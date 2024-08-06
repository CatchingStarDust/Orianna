const { SlashCommandBuilder } = require('@discordjs/builders');
const UserProfile = require('../schemas/UserProfile');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('openBasicCapsule')
        .setDescription('Roll for a chance at one of the basic colours'),

    async execute(interaction) {

        if (!interaction.inGuild()) {
            await interaction.reply({ content: 'This command can only be used in a server.', ephemeral: true });
            return;
        }

        await interaction.deferReply(); 

        try {
               //removes a capsule from the user inventory
    userProfile.capsules -= cost;
    

    //gacha that decides whether the user wins at all or not

    Math.floor(Math.random() * 10) + 1;


    
    // if user wins: Gacha for the role colour itself
            
        } catch (error) {
            console.error(`Error handling /daily: ${error}`);
            await interaction.editReply('There was an error while processing your request.'); 
        }

     

    },
}