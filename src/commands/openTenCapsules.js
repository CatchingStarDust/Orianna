const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const UserProfile = require('../schemas/UserProfile.js');
const { WeightedRandomSelectTenPull } = require('../functions/colourWeightsRng.js');
const { checkIfUserHasBasicCapsules, getServerMember, checkPityCounter } = require('../functions/checks.js');
const {coloursAndWeightsList} = require('../schemas/colourCategoriesAndWeights.js');

/** the slash command itself */
module.exports = {
    data: new SlashCommandBuilder()
    .setName('open-ten-capsules')
    .setDescription('Open capsule and get a colour'),

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
        if (!hasBasicCapsule || serverMember.basicCapsules < 10) {
            await interaction.editReply({ content: "You need at least 10 capsules to open" });
            return;
        }

        try {
            await UserProfile.findOneAndUpdate(
                { userId: interaction.user.id },
                { $inc: { basicCapsules: -10 } }, 
                { new: true, upsert: true },
        );
        
        const collectiveColourWeight = coloursAndWeightsList;
        const colourResult = Array.from({ length: 10 }, () => { return WeightedRandomSelectTenPull(collectiveColourWeight) });

        const RoleColourText = colourResult.map(colorName => {
            const role = interaction.guild.roles.cache.find(r => r.name.toLowerCase() === colorName.toLowerCase());
                return role ? `<@&${role.id}>` : colorName;
        });

        /** checks if the user already has the colour they won */
        const alreadyOwnsColour = colourResult.every(color => serverMember.coloursOwned.includes(color));


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
                    \n         ୨═════₊˚.⋆˚${RoleColourText.join(', ')}˚⋆.˚₊═════୧
                    \n ....but you already own them, so they disappear.
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
                    \n Click:  ||୨═════₊˚.⋆˚${RoleColourText.join(', ')}˚⋆.˚₊═════୧||
                    \n╚══════════ ≪ ୨🕷୧ ≫ ══════════╝`
        );
    
    
        await interaction.editReply({ embeds: [basicCapsuleResultEmbed] });

        } catch (error) {
            console.error(`Error handling /open-basic-capsule-beta: ${error}`);
            await interaction.editReply(`Error handling /open-basic-capsule: ${error}`); 
        }

    }
}
