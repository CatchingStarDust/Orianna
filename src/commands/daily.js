const { SlashCommandBuilder } = require('@discordjs/builders');
const UserProfile = require('../schemas/UserProfile');
const createNewProfile = require('../functions/createNewProfile');
const weightedRandomSelect = require('../functions/weightedRandomSelect');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Gives you your daily reward, including a random capsule!'),

    async execute(interaction) {

        await interaction.deferReply();

            try {
                const serverMember = UserProfile.findOne({userId: interaction.user.id});

                if (!serverMember) {
                    createNewProfile();
                } 
                
            const now = new Date();
            const lastDailyCollected = UserProfile.lastDailyCollected || new Date(0);
            const twentyFourHours = 24 * 60 * 60 * 1000;

                if (now - lastDailyCollected < twentyFourHours) {
                    await interaction.editReply({ content: 'You have already collected your daily reward today!', ephemeral: true });
                    return;
                }
                    
            // Define the probabilities for each capsule type
            const capsuleWeights = [
                { type: 'basicCapsule', weight: 0.50 },
                { type: 'holidayCapsule', weight: 0.30 },
                { type: 'autumnCapsule', weight: 0.20 }
    
                ];
    
            // give the user the capsule they pulled
            const selectedCapsuleType = weightedRandomSelect(capsuleWeights);     
    
            switch(selectedCapsuleType){
            case 'BasicCapsule': {
                UserProfile.findOneAndUpdate(
                    { userId: userId },
                    { $inc: { basicCapsules: 1 } },
                    { new: true }
                )}
            case 'HolidayCapsule': {
                UserProfile.findOneAndUpdate(
                    { userId: userId },
                    { $inc: { holidayCapsule: 1 } },
                    { new: true }    
                )}
            case 'AutumnCapsule': {
                UserProfile.findOneAndUpdate(
                    { userId: userId },
                    { $inc: { autumnCapsule: 1 } },
                    { new: true }    
                )}
                break;
    
                } 


                    await interaction.editReply({ content: `You have collected your daily reward and received a ${selectedCapsuleType}!`});
                    await UserProfile.save();
    
        
    
                }   catch (error) {
                        console.error(`OOPS: ${error}`)
                    await interaction.editReply({ content:`The Ball is angry... : ${error}`, ephemeral: true });
         }
        
            
    
             
    }
};
