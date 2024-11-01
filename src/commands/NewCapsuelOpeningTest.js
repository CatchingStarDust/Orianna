const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const UserProfile = require('../schemas/UserProfile');
const { newWeightedRandomSelect } = require('../functions/colourWeightsRng.js');
const { checkIfUserHasBasicCapsules, getServerMember, checkPityCounter } = require('../functions/checks');
const {coloursAndWeights} = require('../schemas/colourCategoriesAndWeights.js');

/** the slash command itself */
module.exports = {
    data: new SlashCommandBuilder()
    .setName('new-open-capsule-beta')
    .setDescription('TESTING NEW GACHA SYSTEM'),

    async execute(interaction) {
       await interaction.deferReply();

        if (!interaction.inGuild()) {
            return;
        }

        /** Makes sure the user is a member of the server */
        let serverMember = await UserProfile.findOne({ userId: interaction.user.id });

        if (!serverMember) {
            createNewProfile();
            await interaction.editReply(`New Profile created.`);
        }

        /** make sure the user has basic capsules in their inventory */
        const hasBasicCapsule = await checkIfUserHasBasicCapsules(serverMember, interaction);
        if (!hasBasicCapsule) return;

        try {
            await UserProfile.findOneAndUpdate(
                { userId: interaction.user.id },
                { $inc: { basicCapsules: -1 } }, 
                { new: true, upsert: true },
            );
            
            const collectiveColourWeight = coloursAndWeights;
            const colourResult = newWeightedRandomSelect(collectiveColourWeight);
     
            await serverMember.save();
    
            /** the embed that shows the results of the capsule */
            const basicCapsuleResultEmbed = new EmbedBuilder()
            .setColor("Yellow")
            .setTitle(" Open Capsule")
            .setDescription(`<@${interaction.user.id}> opens the capsule and receives...|| ${colourResult}! ||`);
    
    
            await interaction.editReply({ embeds: [basicCapsuleResultEmbed] });

        } catch (error) {
            console.error(`Err or handling /open-basic-capsule-beta: ${error}`);
            await interaction.editReply(`Error handling /open-basic-capsule: ${error}`); 
        }

    }
}
