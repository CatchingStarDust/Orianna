const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const UserProfile = require('../schemas/UserProfile');
const { weightedRandomSelect, colourRoleIds, } = require('./daily');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('open-basic-capsule')
        .setDescription('Roll for a chance at one of the basic colours'),

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
        { type: 'red', weight: 0.10 },
        { type: 'orange', weight: 0.10 },
        { type: 'yellow', weight: 0.10 },
        { type: 'green', weight: 0.10 },
        { type: 'blue', weight: 0.10 },
        { type: 'purple', weight: 0.10 },
        { type: 'pink', weight: 0.10 },
        { type: 'seafoam', weight: 0.10} ,
        { type: 'grey', weight: 0.10},
        { type: 'slate', weight: 0.10},

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
        case 'red': {
             await UserProfile.findOneAndUpdate(
                 { userId: serverMember.userId },
                 { $push: { coloursOwned: 'red' }},
                 { new: true, upsert: true }
             )}
             break;
        case 'yellow': {
             await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'yellow' }},
                { new: true, upsert: true }    
             )}
             break;
        case 'orange': {
             await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'orange' }},
                { new: true, upsert: true }   
             )}
             break;

        case 'green': {
            await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'green' }},
                { new: true, upsert: true }   
            )}
            break;
            
        case 'blue': {
            await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'blue' }},
                { new: true, upsert: true }   
            )}
            break;    
    
        case 'purple': {
             await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'purple' }},
                { new: true, upsert: true }   
             )}
             break;

        case 'pink': {
            await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'pink' }},
                { new: true, upsert: true }   
            )}
            break;
            
        case 'seafoam': {
            await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'seafoam' }},
                { new: true, upsert: true }   
            )}
            break;

        case 'grey': {
            await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'grey' }},
                { new: true, upsert: true }   
            )}
            break;
   
        case 'slate': {
            await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'slate' }},
                { new: true, upsert: true }   
            )}
            break;
             }

     // Save the updated user profile
            await serverMember.save();

            const basicCapsuleResultEmbed = new EmbedBuilder()
            .setColor("Blurple")
            .setDescription(`<@${interaction.user.id}> opens the capsule and receives... <@&${selectedColourType}>!`);

            await interaction.editReply({ embeds: [basicCapsuleResultEmbed] });

            

            
            } catch (error) {
                console.error(`Error handling /open-basic-capsule: ${error}`);
            await interaction.editReply(`Error handling /open-basic-capsule: ${error}`); 
        }

     

    },
}