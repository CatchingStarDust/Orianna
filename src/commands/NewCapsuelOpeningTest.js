const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const UserProfile = require('../schemas/UserProfile');
const { newWeightedRandomSelect } = require('../functions/colourWeightsRng.js');
const { checkIfUserHasBasicCapsules, getServerMember, checkPityCounter } = require('../functions/checks');
const {coloursAndWeightsList} = require('../schemas/colourCategoriesAndWeights.js');

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
            await createNewProfile();
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
        
        const collectiveColourWeight = coloursAndWeightsList;
        const colourResult = newWeightedRandomSelect(collectiveColourWeight);
        const RoleColourText = await interaction.guild.roles.cache.find(role => role.name.toLowerCase() === colourResult.toLowerCase());

        /** checks if the user already has the colour they won */
        const alreadyOwnsColour = serverMember.coloursOwned.includes(colourResult);

            if (alreadyOwnsColour) {
            const alreadyOwnsEmbed = new EmbedBuilder()
                .setColor("Orange")
                .setTitle(" Open Capsule")
                .setDescription(
                    `\n### ✩₊˚.⋆⋆⁺₊✧⁺‧₊˚ ཐི⋆⋆ཋྀ⋆⁺₊✧⁺‧₊˚✩₊˚.⋆ 
                    \n<@${interaction.user.id}> has opened a Capsule!
                    \n╰┈➤ You have ${serverMember.basicCapsules} left.
                    \n### You look inside of the capsule and find...
                    \n╔══════════ ≪ ୨🕷୧ ≫ ══════════╗
                    \n         ୨═════₊˚.⋆˚${RoleColourText}˚⋆.˚₊═════୧
                    \n ....but you already own it, so it disappears.
                    \n╚══════════ ≪ ୨🕷୧ ≫ ══════════╝`
            );
            return await interaction.editReply({ embeds: [alreadyOwnsEmbed] });
        }
     
        await UserProfile.findOneAndUpdate(
            { userId: serverMember.userId },
            { $push: { coloursOwned: colourResult }},
            { new: true, upsert: true }
          ) // docs say to use ).exec(), but it seems optional
        await serverMember.save();
    
        /** the embed that shows the results of the capsule */
        const basicCapsuleResultEmbed = new EmbedBuilder()
            .setColor("Yellow")
            .setTitle(" Open Capsule")
            .setDescription(
                    `\n### ✩₊˚.⋆⋆⁺₊✧⁺‧₊˚ ཐི⋆⋆ཋྀ⋆⁺₊✧⁺‧₊˚✩₊˚.⋆ 
                    \n<@${interaction.user.id}> has opened a Capsule!
                    \n╰┈➤ You have ${serverMember.basicCapsules} left.
                    \n### You look inside of the capsule and find...
                    \n╔══════════ ≪ ୨🕷୧ ≫ ══════════╗
                    \n Click:  ||୨═════₊˚.⋆˚${RoleColourText}˚⋆.˚₊═════୧||
                    \n╚══════════ ≪ ୨🕷୧ ≫ ══════════╝`
        );
    
    
        await interaction.editReply({ embeds: [basicCapsuleResultEmbed] });

        } catch (error) {
            console.error(`Error handling /open-basic-capsule-beta: ${error}`);
            await interaction.editReply(`Error handling /open-basic-capsule: ${error}`); 
        }

    }
}
