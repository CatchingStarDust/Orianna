const { Events, EmbedBuilder } = require('discord.js');
const UserProfile = require('../schemas/UserProfile.js');
const ReactionPost = require('../schemas/roleColourData.js');

module.exports = (client) => {
    client.on(Events.MessageReactionAdd, async (reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the reaction: ', error);
            return;
        }
    }

    const emoji = reaction.emoji.id ? `<:${reaction.emoji.name}:${reaction.emoji.id}>` : reaction.emoji.name;
    const guild = reaction.message.guild;
    const targetChannelId = '1145845796005236916';
    const targetChannel = guild.channels.cache.get(targetChannelId);
        
    const ReactionPostData = await ReactionPost.findOne({ 
        Guild: reaction.message.guild.id, 
        Message: reaction.message.id, 
        Emoji: emoji, 
    });
    
        if (!ReactionPostData) {
            console.log('No matching data found for this reaction.');
            return;
    }

    const colourName = ReactionPostData.ColourName;
        console.log(`${emoji}'s role colour: ${colourName}`); // Check what emoji and role colour is being accessed
    
    const userProfile = await UserProfile.findOne({ userId: user.id });
    const member = await guild.members.fetch(user.id);
    const role = guild.roles.cache.get(ReactionPostData.Role);
    const requiredColour = ReactionPostData.ColourName;
    const userOwnsColour = userProfile?.coloursOwned.includes(requiredColour);

        if (!userOwnsColour) {
            console.log(`User ${user.tag} does not have: ${requiredColour} in their inventory`);

            const noColourUnlocked = new EmbedBuilder()
                .setColor("Blurple")
                .setDescription(`<@${user.id}> cannot equip <@&${ReactionPostData.Role}> because they have not unlocked the colour!`);

            if (targetChannel) {
                await targetChannel.send({ embeds: [noColourUnlocked] });
            }
            return;
            }

    /** checks to see if the user already has a colour equipped 
    * and removes it if they do before applying new colour
    */
   const AllPossibleRoleColours = await ReactionPost.find({Guild:guild.id});

            for (const RoleColourData of AllPossibleRoleColours ) {
                const roleColour = guild.roles.cache.get(RoleColourData.Role);

                if (member.roles.cache.has(roleColour.id)) {
                    await member.roles.remove(roleColour.id);
                }
            }

    /** gives user the colour */
    await member.roles.add(role);

    const equipColourEmbed = new EmbedBuilder()
        .setColor("Blurple")
        .setDescription(`<@${user.id}> has equipped <@&${ReactionPostData.Role}>!`);

        if (targetChannel) {
            await targetChannel.send({ embeds: [equipColourEmbed] });
        }
        return;
        
    }); 


    /** REMOVE ROLES */
    client.on(Events.MessageReactionRemove, async (reaction, user) => {
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the reaction: ', error);
                return;
            }
        }
    
        const emoji = reaction.emoji.id ? `<:${reaction.emoji.name}:${reaction.emoji.id}>` : reaction.emoji.name;
        const guild = reaction.message.guild;
        const targetChannelId = '1145845796005236916';
        const targetChannel = guild.channels.cache.get(targetChannelId);
            
        const ReactionPostData = await ReactionPost.findOne({ 
            Guild: reaction.message.guild.id, 
            Message: reaction.message.id, 
            Emoji: emoji, 
        });
        
            if (!ReactionPostData) {
                console.log('No matching data found for this reaction.');
                return;
        }
        
        
        const member = await guild.members.fetch(user.id);
        const role = guild.roles.cache.get(ReactionPostData.Role);
    
        /** gives user the colour */
        await member.roles.remove(role);
    
        const removeColourEmbed = new EmbedBuilder()
            .setColor("Blurple")
            .setDescription(`<@${user.id}> has removed <@&${ReactionPostData.Role}>!`);
    
            if (targetChannel) {
                await targetChannel.send({ embeds: [removeColourEmbed] });
            }
            return;

    });

}; 
