// where the bot gives users their colours
module.exports = (client) => {

    const {Events, EmbedBuilder } = require('discord.js');
    const ReactionPost = require('../schemas/roleColourData.js');
    const UserProfile = require('../schemas/UserProfile.js');
    
    /* when someone reacts 
    to a post with 
    the assigned emojis*/

    client.on(Events.MessageReactionAdd, async (reaction, user) => {

    console.log('REACTION EVENT TRIGGERED');        
    /**If it doesn't log this, the event listener might not be set up correctly.*/

    if (reaction.partial) await reaction.fetch();
    if (reaction.bot) return;
        
    const emoji = reaction.emoji.id ? `<:${reaction.emoji.name}:${reaction.emoji.id}>` : reaction.emoji.name;
    const message = reaction.message;
    const guild = message.guild;

    const reactionRole = await ReactionPost.findOne({
      Guild: guild.id,
      Message: message.id,
      Emoji: emoji,
    });

    // Add null check for reactionRole
    if (!reactionRole) {
        console.log('No matching data found for this reaction.');
        return;
    }

    const userProfile = await UserProfile.findOne({ userId: userId });

    const colourName = reactionRole.ColourName;
    const coloursOwned = userProfile.coloursOwned;

    console.log(`COLOUR NAME ATTACHED TO ${emoji}: ${colourName}`);

    
    const requiredColour = reactionRole.ColourName;
    const userOwnsColour = userProfile.coloursOwned.includes(requiredColour);
    const targetChannelId = '1145845796005236916'
        
    if (!userOwnsColour) {
        console.log(`User ${user.tag} does not have: ${requiredColour} in their inventory`);
        
    const targetChannel = guild.channels.cache.get(targetChannelId);
    const noColourUnlocked = new EmbedBuilder()
        .setColor("Blurple")
        .setDescription(`<@${user.id}>, cannot equip <@&${reactionRole.Role}> because they have not unlocked the colour!`);
        
    if (targetChannel) {
        await targetChannel.send({ embeds: [noColourUnlocked] });
                        
    }

    return;

    }
        
    try {
        
        if (emoji=== -1) {
                console.log(`Emoji ${emoji} not found in the data`);
                        return;
        }
        
        const RolesAssignedToReactionPost = reactionRole.Role;
        const member = await guild.members.fetch(user.id);
        
        for (const currentRole of RolesAssignedToReactionPost) {
            if (member.roles.cache.has(currentRole)) {
                await member.roles.remove(currentRole);
                console.log(`Removed role ${currentRole} from user ${user.tag}`);
            }         
        }
        
        await member.roles.add(reactionRole.Role);
            console.log(`Role ${reactionRole.Role} added to user ${user.tag}`);
        
        /*confirmation*/
        const targetChannel = guild.channels.cache.get(targetChannelId);
        
        const giveColourEmbed = new EmbedBuilder()
            .setColor("Blurple")
            .setDescription(`<@${user.id}> has equipped <@&${reactionRole.Role}>! Looking good!`);
    
        if (targetChannel) {
            await targetChannel.send({ embeds: [giveColourEmbed] });
        }
        return;
        
    } catch (error) {
        console.error(`TROUBLE ADDING ROLE: ${error}`);
    }

    });


// ----


    // REMOVE REACTIONS
    client.on(Events.MessageReactionRemove, async (reaction, user) => {
    const targetChannelId = '1145845796005236916'

    if (!reaction.message.guildId) 
        return;

    if (user.bot) 
         return;

    
                
    const emoji = reaction.emoji.id ? `<:${reaction.emoji.name}:${reaction.emoji.id}>` : reaction.emoji.name;
    const message = reaction.message;
    const guild = reaction.message.guild;
        
    const reactionRole = await ReactionPost.findOne({
        Guild: guild.id,
        Message: message.id,
        Emoji: emoji,
    });


    if (!reactionRole) return;

    
    const member = await guild.members.fetch(user.id);
    const userProfile = await UserProfile.findOne({ userId: userId });

        

        try {
            await member.roles.remove(reactionRole.Role);

            if (!userProfile || !userProfile.coloursOwned.includes(reactionRole.ColourName)) {
                return;   
        }

        const colourRemovalEmbed = new EmbedBuilder()
            .setColor("Blurple")
            .setDescription(`<@${user.id}> has removed <@&${reactionRole.Role}>!`);

            
            const targetChannel = guild.channels.cache.get(targetChannelId);

            
            if (targetChannel) {
                await targetChannel.send({ embeds: [colourRemovalEmbed] });
            } else {
                console.error(`Target channel with ID ${targetChannelId} not found.`);
            }


        } catch (error) {
            console.error(`TROUBLE REMOVING ROLE: ${error}`);
        }
    });


}
