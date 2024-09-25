// where the bot gives users their colours
module.exports = (client) => {

    const {Events, EmbedBuilder } = require('discord.js');
    const ReactionPost = require('../schemas/roleColourData.js');
    const UserProfile = require('../schemas/UserProfile.js');
    
    /* when someone reacts 
    to a post with 
    the assigned emojis*/
    client.on(Events.MessageReactionAdd, async (reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();  // Fetch the full reaction object if it’s partial
                console.log('Fetched the reaction:', reaction);
        } catch (error) {
            console.error('Error fetching reaction:', error);
            return;
        }
    }
        
  
    const emoji = reaction.emoji.id ? `<:${reaction.emoji.name}:${reaction.emoji.id}>` : reaction.emoji.name;
    const messageId = reaction.message.id;
    const guildId = reaction.message.guild.id;

    const data = await ReactionPost.findOne({ 
        Guild: guildId, 
        Message: messageId, 
        Emoji: emoji,
        Role: role.id,
        ColourName: ColourName
    });

    if (!data) {
        console.log('No matching data found for this reaction.');
        return;
    }


    const requiredColour = data.ColourName;
    const userOwnsColour = userProfile.coloursOwned.includes(requiredColour);
    const targetChannelId = '1145845796005236916'
        
    if (!userOwnsColour) {
        console.log(`User ${user.tag} does not have: ${requiredColour} in their inventory`);
        
    const targetChannel = guild.channels.cache.get(targetChannelId);
    const noColourUnlocked = new EmbedBuilder()
        .setColor("Blurple")
        .setDescription(`<@${user.id}>, cannot equip <@&${data.Role}> because they have not unlocked the colour!`);
        
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
        
        const RolesAssignedToReactionPost = data.Role;
        const member = reaction.message.guild.members.cache.get(user.id);
        
        for (const currentRole of RolesAssignedToReactionPost) {
            if (member.roles.cache.has(currentRole)) {
                await member.roles.remove(currentRole);
                console.log(`Removed role ${currentRole} from user ${user.tag}`);
            }         
        }
        
        await member.roles.add(data.Role);
            console.log(`Role ${data.Role} added to user ${user.tag}`);
        
        /*confirmation*/
        const targetChannel = guild.channels.cache.get(targetChannelId);
        
        const giveColourEmbed = new EmbedBuilder()
            .setColor("Blurple")
            .setDescription(`<@${user.id}> has equipped <@&${data.Role}>! Looking good!`);
    
        if (targetChannel) {
            await targetChannel.send({ embeds: [giveColourEmbed] });
        }
        return;
        
    } catch (error) {
        console.error(`TROUBLE ADDING ROLE: ${error}`);
    }

    });

    // REMOVE REACTIONS
    client.on(Events.MessageReactionRemove, async (reaction, user) => {
    const targetChannelId = '1145845796005236916'

            if (!reaction.message.guildId) 
                return;

            if (user.bot) 
                return;

    const emojiId = reaction.emoji.id ? `<:${reaction.emoji.name}:${reaction.emoji.id}>` : reaction.emoji.name;  
    const colourData = await ReactionPost.findOne({ 
            Guild: reaction.message.guild.id, 
            Message: reaction.message.id, 
            Emoji: emojiId 
        });


            if (!colourData) return;

    const guild = reaction.message.guild;
    const userProfile = await UserProfile.findOne({ userId: user.id });

        

        try {
            await member.roles.remove(colourData.Role);

            if (!userProfile || !userProfile.coloursOwned.includes(colourData.ColourName)) {
                return;   
        }

        const colourRemovalEmbed = new EmbedBuilder()
            .setColor("Blurple")
            .setDescription(`<@${user.id}> has removed <@&${colourData.Role}>!`);

            
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
