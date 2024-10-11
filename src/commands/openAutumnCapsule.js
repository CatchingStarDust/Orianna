const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const UserProfile = require('../schemas/UserProfile');
const { weightedRandomSelect, } = require('./daily');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('open-basic-capsule')
        .setDescription('Roll for a chance at one of the autumn colours'),

    async execute(interaction) {

        await interaction.deferReply(); 

            if (!interaction.inGuild()) {
                return;
        }

        let serverMember = await UserProfile.findOne({ userId: interaction.user.id });

            if (!serverMember) {
                createNewProfile();
                await interaction.editReply(`New Profile created.`);
        }

        
    const autumnColourWeights = [
        { type: 'scaredy-cat-black', weight: 0.20 },
        { type: 'jack-o-lantern-orang', weight: 0.20 },
        { type: 'harvest-brown', weight: 0.20 },
        { type: 'spice-red', weight: 0.20 },
        { type: 'nothing', weight: 0.20 },

    ];
        
        
    //check if user has capsules to open
        if (serverMember.basicCapsules <= 0) {
            await interaction.editReply({ content: `You don't have any capsules to open!`, ephemeral: true });
            return;
        }

        try {

     //removes a capsule from the user inventory
            await UserProfile.findOneAndUpdate(
            { userId: interaction.user.id },
            { $inc: { basicCapsules: -1 } }, 
            { new: true, upsert: true },
        );

     // Select a capsule type based on the defined weights
     let selectedColourType = weightedRandomSelect(autumnColourWeights);
   

     // Update the appropriate capsule count in the user's profile
     switch(selectedColourType){
        case 'scaredy-cat-black': {
             await UserProfile.findOneAndUpdate(
                 { userId: serverMember.userId },
                 { $push: { coloursOwned: 'red' }},
                 { new: true, upsert: true }
             )}
             break;
        case 'jack-o-lantern-orange': {
             await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'yellow' }},
                { new: true, upsert: true }    
             )}
             break;
        case 'harvest-brown': {
             await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'orange' }},
                { new: true, upsert: true }   
             )}
             break;

        case 'spice-red': {
            await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'green' }},
                { new: true, upsert: true }   
            )}
            break;
            
        case 'nothing': {
            await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'blue' }},
                { new: true, upsert: true }   
            )}
            break;    
             }

     // Save the updated user profile
            await serverMember.save();

    const ColourResult = await interaction.guild.roles.cache.find(role => role.name.toLowerCase() === selectedColourType.toLowerCase());

            if (!ColourResult) {
                return await interaction.editReply({ content: `Could not find a role named "${selectedColourType}" in this guild.`, ephemeral: true });
            }
    
    const basicCapsuleResultEmbed = new EmbedBuilder()
            .setColor("Blurple")
                .setDescription(`<@${interaction.user.id}> opens the capsule and finds...|| ${ColourResult}! ||`);


            await interaction.editReply({ embeds: [basicCapsuleResultEmbed] });

            

            
            } catch (error) {
                console.error(`Err or handling /open-basic-capsule: ${error}`);
            await interaction.editReply(`Error handling /open-basic-capsule: ${error}`); 
        }

     
       
    },
}

