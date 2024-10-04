const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const UserProfile = require('../schemas/UserProfile');
const { weightedRandomSelect } = require('./daily');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('open-basic-capsule')
        .setDescription('Roll for a chance at one of the autumn colours'),

    async execute(interaction) {

        await interaction.deferReply(); 

            if (!interaction.inGuild()) {
                await interaction.reply({ content: 'This command can only be used in a server.', ephemeral: true });
                return;
        }

        let serverMember = await UserProfile.findOne({ userId: interaction.user.id });

            if (!serverMember) {
                createNewProfile();
                await interaction.editReply(`New Profile created.`);
        }

        
    const basicColourWeights = [
        { type: 'jackOlanternOrange', weight: 0.015625 },
        { type: 'scaredyCatBlack', weight: 0.015625 },
        { type: 'harvestBrown', weight: 0.015625 },
        { type: 'spiceRed', weight: 0.015625 },
        { type: 'nothing', weight: 0.9375 },
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
     let selectedColourType = weightedRandomSelect(basicColourWeights);     

     // Update the appropriate capsule count in the user's profile
     switch(selectedColourType){
        case 'jackOlanternOrange': {
             await UserProfile.findOneAndUpdate(
                 { userId: serverMember.userId },
                 { $push: { coloursOwned: 'jackOlanternOrange' }},
                 { new: true, upsert: true }
             )}
             break;
        case 'scaredyCatBlack': {
             await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'scaredyCatBlack' }},
                { new: true, upsert: true }    
             )}
             break;
        case 'harvestBrown': {
             await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'harvestBrown' }},
                { new: true, upsert: true }   
             )}
             break;

        case 'spiceRed': {
            await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'spiceRed' }},
                { new: true, upsert: true }   
            )}
            break;
            
        case 'nothing': {}
            break;    
             }

     // Save the updated user profile
            await serverMember.save();

            const basicCapsuleResultEmbed = new EmbedBuilder()
            .setColor("Blurple")
            .setDescription(`<@${user.id}> opens the capsule and receives... <@&${selectedColourType}>!`);

            await interaction.editReply({ embeds: [basicCapsuleResultEmbed] });

            

            
            } catch (error) {
                console.error(`Error handling /open-basic-capsule: ${error}`);
            await interaction.editReply(`Error handling /open-basic-capsule: ${error}`); 
        }

     

    },
}