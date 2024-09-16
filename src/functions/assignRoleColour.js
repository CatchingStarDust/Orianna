// where the bot gives users their colours
module.exports = (client) => {
    const {Events, EmbedBuilder } = require('discord.js');
    const ReactionPost = require('../schemas/roleColourData.js');
    const UserProfile = require('../schemas/UserProfile.js');
    

    /* when someone reacts 
    to a post with 
    the assigned emojis*/
    client.on(Events.MessageReactionAdd, async (reaction, user) => {

        /* tries fetch the partial 
        message in case the user 
        reacts to an old post*/
        if (reaction.partial) {
            try {
                await reaction.fetch();
                
            } catch (error) {
                console.error('ERROR FETCHING MESSAGE:', error);
                return;
            }
        }

        /* DEBUGGING to see if the event 

        is being triggered at all*/

        console.log('REACTION HAS BEEN TRIGGERED');  

            if (!reaction.message.guildId) return;
            if (user.bot) return;

            if (!reaction.message.guildId) 
                return;

            if (user.bot) 
                return;

        const guild = reaction.message.guild;
        const member = guild.members.cache.get(user.id);
        const userProfile = await UserProfile.findOne({ userId: user.id })

        // DEBUGGING
        console.log(`Reaction by ${user.tag} on message ${reaction.message.id} in guild ${guild.id}`);
        // DEBUGGING
        

        /* checks to see if 
        the emoji assigned is a custom 
        or default emoji*/
        const guildId = guild.id.toString();
        const messageId = reaction.message.id.toString();
        const emojiId = reaction.emoji.id ? `<:${reaction.emoji.name}:${reaction.emoji.id}>` : reaction.emoji.name;

        /* variable represents looking in 
        the reaction schema for 
        specific attributes as well as 
        checking for custom emojis*/
        const data = await ReactionPost.findOne({ 
            Guild: guildId,  
            Message: messageId, 
            Emoji: emojiId,
        });

        // DEBUGGING
            if (!data) {

                try {
                    
                } catch (error) {
                    console.error('Something went wrong when trying to fetch the message:', error);
                    console.log(`No reaction data found for guild: ${guildId}, message: ${messageId}, emoji: ${emojiId}`);
                    return; 
                }
                
            }
        console.log(`Reaction data found: ${JSON.stringify(data)}`);
        // DEBUGGING

        /* assigns the colour name to the 
        corresponding emoji it's attached to, 
        and checks to see if 
        that colour(string) 
        is in the user profile*/
        const emoji = data.Emoji;
        const requiredColour = data.ColourName;
        const userOwnsColour = userProfile.coloursOwned.includes(requiredColour);
        const targetChannelId = '1145845796005236916'

            if (!userOwnsColour) {
                console.log(`User ${user.tag} does not have: ${data.ColourName} in their inventory`);

        const targetChannel = guild.channels.cache.get(targetChannelId);
        const noColourUnlocked = new EmbedBuilder()
            .setColor("Blurple")
            .setDescription(`<@${user.id}>, cannot equip <@&${data.Role}> because they have not unlocked the colour!`);

            if (targetChannel) {
                await targetChannel.send({ embeds: [noColourUnlocked] });
                
            }
            return;
        }

            if (!data) return;

        try {

            if (emoji=== -1) {
                console.log(`Emoji ${emojiId} not found in the data`);
                return;
            }

        /* for loop searches 
        through the list of roles
        attached to the post
        and removes it from the user
        if they already have it equipped */
        const RolesAssignedToReactionPost = data.Role;

        for (const currentRole of RolesAssignedToReactionPost) {
            if (member.roles.cache.has(currentRole)) {
                await member.roles.remove(currentRole);
                console.log(`Removed role ${currentRole} from user ${user.tag}`);
            }         
        }

        const newRole = data.Role;

                await member.roles.add(newRole);
                console.log(`Role ${data.Role} added to user ${user.tag}`);

        /*confirmation*/
        const targetChannel = guild.channels.cache.get(targetChannelId);

        const giveColourEmbed = new EmbedBuilder()
            .setColor("Blurple")
            .setDescription(`<@${user.id}> has equipped <@&${newRole}>! Looking good!`);

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

        const emojiId = reaction.emoji.id ? `<:${reaction.emoji.name}:${reaction.emoji}>` : reaction.emoji.name;

        const data = await ReactionPost.findOne({ 
            Guild: reaction.message.guild.id, 
            Message: reaction.message.id, 
            Emoji: emojiId });


            if (!data) return;

        const guild = reaction.message.guild;
        const member = guild.members.cache.get(user.id);
        const userProfile = await UserProfile.findOne({ userId: user.id });

        

        try {
            await member.roles.remove(data.Role);

            if (!userProfile || !userProfile.coloursOwned.includes(data.ColourName)) {
                return;   
        }

        const colourRemovalEmbed = new EmbedBuilder()
            .setColor("Blurple")
            .setDescription(`<@${user.id}> has removed <@&${data.Role}>!`);

            
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