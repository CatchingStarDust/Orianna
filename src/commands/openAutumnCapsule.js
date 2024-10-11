const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const UserProfile = require('../schemas/UserProfile');
const { weightedRandomSelect, } = require('./daily');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('open-autumn-capsule')
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
    { type: 'scaredy-cat-black', weight: 0.015625 },
    { type: 'jack-o-lantern-orange', weight: 0.015625 },
    { type: 'harvest-brown', weight: 0.015625 },
    { type: 'spice-red', weight: 0.015625 },
    { type: 'nothing', weight: 0.9375 }, 
];

        
        
    //check if user has capsules to open
        if (serverMember.autumnCapsules <= 0) {
            await interaction.editReply({ content: `You don't have any capsules to open!`, ephemeral: true });
            return;
        }

        try {

     //removes a capsule from the user inventory
            await UserProfile.findOneAndUpdate(
            { userId: interaction.user.id },
            { $inc: { autumnCapsules: -1 } }, 
            { new: true, upsert: true },
        );

     // Select a capsule type based on the defined weights
     const selectedColourType = weightedRandomSelect(autumnColourWeights);
     const ColourResult = await interaction.guild.roles.cache.find(role => role.name.toLowerCase() === selectedColourType.toLowerCase());

    /*if someone already has the colour, 
    it will just say that they already own it*/
    const alreadyOwnsColour = serverMember.coloursOwned.includes(selectedColourType);
            if (alreadyOwnsColour) {
                const alreadyOwnsEmbed = new EmbedBuilder()
                    .setColor("Orange")
                    .setTitle(" Open Capsule")
                    .setDescription(`### ✩₊˚.⋆♱⋆⁺₊✧⁺‧₊˚ ཐི⋆🕸️⋆ཋྀ⋆⁺₊✧⁺‧₊˚♱✩₊˚.⋆ 
                        \n<@${interaction.user.id}> opens the capsule and finds... ${ColourResult}!
                        \n...but you already own it, so it disappears.`);
                
                return await interaction.editReply({ embeds: [alreadyOwnsEmbed] });
            }
   

     // Update the appropriate capsule count in the user's profile
     switch(selectedColourType){
        case 'scaredy-cat-black': {
             await UserProfile.findOneAndUpdate(
                 { userId: serverMember.userId },
                 { $push: { coloursOwned: 'scaredy-cat-black' }},
                 { new: true, upsert: true }
             )}
             break;
        case 'jack-o-lantern-orange': {
             await UserProfile.findOneAndUpdate(
                { userId: serverMember.userId },
                { $push: { coloursOwned: 'jack-o-lantern-orange' }},
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
                { $push: { coloursOwned: 'spice-red' }},
                { new: true, upsert: true }   
            )}
            break;
        case 'nothing': {
                break;  
                }
                
             }

     // Save the updated user profile
            await serverMember.save();

            if (selectedColourType === 'nothing') {
                const noPrizeEmbed = new EmbedBuilder()
                    .setColor("Orange")
                    .setTitle(" Open Capsule")
                    .setDescription(
                    `\n### ✩₊˚.⋆♱⋆⁺₊✧⁺‧₊˚ ཐི⋆🕸️⋆ཋྀ⋆⁺₊✧⁺‧₊˚♱✩₊˚.⋆ 
                    \n<@${interaction.user.id}> has opened a **Autumn Capsule!**
                    \n╰┈➤ You have ${serverMember.autumnCapsules} left.
                    \n### You look inside of the capsule and find...
                    \n╔══════════ ≪ ୨🕷୧ ≫ ══════════╗
                    \n Click: || ୨═════₊˚.⋆ ≪Nothing≫ ⋆.˚₊═════୧||
                    \n╚══════════ ≪ ୨🕷୧ ≫ ══════════╝`);
                
                return await interaction.editReply({ embeds: [noPrizeEmbed] });
                }

            if (!ColourResult) {
                return await interaction.editReply({ content: `Could not find a role named "${selectedColourType}" in this guild.`, ephemeral: true });
                }
    
    const autumnCapsuleResultEmbed = new EmbedBuilder()
            .setColor("Orange")
            .setTitle(" Open Capsule")
            .setDescription(
            `\n### ✩₊˚.⋆♱⋆⁺₊✧⁺‧₊˚ ཐི⋆🕸️⋆ཋྀ⋆⁺₊✧⁺‧₊˚♱✩₊˚.⋆ 
            \n<@${interaction.user.id}> has opened a **Autumn Capsule!**
            \n╰┈➤ You have ${serverMember.autumnCapsules} left.
            \n### You look inside of the capsule and find...
            \n╔══════════ ≪ ୨🕷୧ ≫ ══════════╗
            \n Click:  ||୨═════₊˚.⋆˚${ColourResult}˚⋆.˚₊═════୧||
            \n╚══════════ ≪ ୨🕷୧ ≫ ══════════╝`);


            await interaction.editReply({ embeds: [autumnCapsuleResultEmbed] });

            

            
            } catch (error) {
                console.error(`Err or handling /open-autumn-capsule: ${error}`);
            await interaction.editReply(`Error handling /open-autumn-capsule: ${error}`); 
        }

     
       
    },
}

