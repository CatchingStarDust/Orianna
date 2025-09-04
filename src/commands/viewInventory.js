const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const UserProfile = require('../schemas/UserProfile');
const needServerEmbed = require('../embeds.js'); 
const { createNewProfile}  = require('./capsuleGet');
const { updateUserNames}  = require('../schemas/displayNames');

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
            await createNewProfile(interaction.user.id);  //userId is passed here
            await interaction.editReply(`New Profile created.`);
        }
                
        // matches the colour name string to existing roles in the server
        // if it finds a match, it auto converts it into it's role id
        const roles = serverMember.coloursOwned.map(colorName => {
        const role = interaction.guild.roles.cache.find(r => r.name.toLowerCase() === colorName.toLowerCase());
            return role ? `<@&${role.id}>` : colorName;
        });

        // display the total number of colours owned
        const totalItems = serverMember.coloursOwned.length;

        //the inventory menu contents
        const currentInventoryMessage = 
        ` Total colours: ${totalItems}
        \n You have the following in your inventory:
            - **Colours owned**: ${roles.join(', ') || 'None'}
            - **Basic Capsules**: ${serverMember.basicCapsules }`;

        // update display name
            await updateUserNames(interaction);    

        // turn the contents into an embed and display the resulting embed
            currentInventoryMessageEmbed = new EmbedBuilder()
            .setColor("Blurple")
            .setTitle("Your Inventory")
            .setDescription(currentInventoryMessage);

            await interaction.editReply({embeds: [currentInventoryMessageEmbed] });


            
        }catch (error) {
            console.log(`OOPS: ${error}`);
        }
    },
};