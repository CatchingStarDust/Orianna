const { SlashCommandBuilder } = require('@discordjs/builders');
const UserProfile = require('../schemas/UserProfile');
const weightedRandomSelect = require('../functions/weightedRandomSelect');


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

            if(serverMember.basicCapsules === 0) {

        await interaction.reply({ content: `You don't have any capsules to open!`, ephemeral: true });

        }


        try {

     //removes a capsule from the user inventory
            UserProfile.findOneAndUpdate(
            { userId: interaction.user.id },
            { $inc: { basicCapsules: -1 } }, 
            { new: true, upsert: true },
        );

     // Select a capsule type based on the defined weights
     const selectedColourType = weightedRandomSelect(basicColourWeights);     

     // Update the appropriate capsule count in the user's profile
     switch(selectedColourType){
         case 'Red': {
             await UserProfile.findOneAndUpdate(
                 { userId: serverMember.userId },
                 { $push: { coloursOwned: 'red' }},
                 { new: true, upsert: true }
             )}
             break;
         case 'Yellow': {
             await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'yellow' }},
                { new: true, upsert: true }    
             )}
             break;
         case 'Orange': {
             await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'orange' }},
                { new: true, upsert: true }   
             )}
             break;

            case 'Green': {
            await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'green' }},
                { new: true, upsert: true }   
            )}
            break;
            
        case 'Blue': {
            await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'blue' }},
                { new: true, upsert: true }   
            )}
            break;    
    
         case 'Purple': {
             await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'purple' }},
                { new: true, upsert: true }   
             )}
             break;

            case 'Pink': {
            await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'pink' }},
                { new: true, upsert: true }   
            )}
            break;
            
        case 'Seafoam': {
            await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'seafoam' }},
                { new: true, upsert: true }   
            )}
            break;

        case 'Grey': {
            await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'grey' }},
                { new: true, upsert: true }   
            )}
            break;
   
        case 'Slate': {
            await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'slate' }},
                { new: true, upsert: true }   
            )}
            break;
             }

     // Save the updated user profile
     await serverMember.save();

     await interaction.editReply({ content: `You open the capsule and receive... ${selectedColourType}!` });

            

            
        } catch (error) {
            console.error(`Error handling /daily: ${error}`);
            await interaction.editReply('There was an error while processing your request.'); 
        }

     

    },
}