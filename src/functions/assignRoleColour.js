// where the bot gives users their colours
module.exports = (client) => {
    const { Client, GatewayIntentBits, Events, } = require('discord.js');
    const ReactionPost = require('../schemas/roleColourData.js');
    const UserProfile = require('../schemas/UserProfile.js');

    const targetChannelId = '1145845796005236916';


    // when someone reacts to a post with the assigned emojis
    client.on(Events.MessageReactionAdd, async (reaction, user,) => {

        // DEBUGGING to see if the event is being triggered at all
        console.log('Reaction has been triggered');  

        if (!reaction.message.guildId) return;
        if (user.bot) return;

        console.log('Reaction passed initial checks');
        // DEBUGGING

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
        
        const messageId = reaction.message.id.toString();
        const guildId = guild.id.toString();
        // checks to see if the emoji assigned is a custom or default emoji
        const emojiId = reaction.emoji.id ? `<:${reaction.emoji.name}:${reaction.emoji.id.toString()}>` : reaction.emoji.name;

        // DEBUGGING
        if (!data) {
            console.log(`No reaction data found for guild: ${guildId}, message: ${messageId}, emoji: ${emojiId}`);
            return;
        }
        console.log(`Reaction data found: ${JSON.stringify(data)}`);
        // DEBUGGING

        // variable represents looking in the reaction schema for specific attributes as well as checking for custom emojis
        const data = await ReactionPost.findOne({ 
            Guild: guildId,  
            Message: messageId, 
            Emoji: emojiId,});

        /* if the user reacts with an emoji that doesn't exist in the reaction database, ori stops */
        if (!data) return;
        

        const noColourUnlocked = new EmbedBuilder()
            .setColor("Blurple")
            .setDescription(`<@${user.id}>, cannot equip <@&${data.Role}> because they have not unlocked the colour!`);

        /* if the user reacts to an emoji that contains the name of a colour that is not in their user profile database
        ori tells them that they do not own the colour and stops the script */
        if (!userProfile.coloursOwned.includes(data.ColourName)) {

            // DEBUGGING
            console.log(`User ${user.tag} does not own the colour ${data.ColourName}`);
            // DEBUGGING

            const targetChannel = guild.channels.cache.get(targetChannelId);

            if (targetChannel) {
                await targetChannel.send({ embeds: [noColourUnlocked] });
                return;
            }
        }


        try {
        // ori gives the user the role assigned to the emoji they reacted to
            await member.roles.add(data.Role);
        console.log(`Role ${data.Role} added to user ${user.tag}`);

        //confirmation that they were given the role   
        const colourEquipEmbed = new EmbedBuilder()
            .setColor("Blurple")
            .setDescription(`<@${user.id}> has quipped <@&${data.Role}>! looking good!`);

        /* if the "colours owned" category in the user's profile does not contain the name(string) of the reaction attached to the post
        ori will tell them that they don't own the role and stop */
            if (!userProfile || !userProfile.coloursOwned.includes(data.ColourName)) {
                    return;   
            }

        //sends the message to the bot commands channel
            const targetChannel = guild.channels.cache.get(targetChannelId);
    
            if (targetChannel) {
                await targetChannel.send({ embeds: [colourEquipEmbed] });
            } else {
                console.error(`Target channel with ID ${targetChannelId} not found.`);
            }
            
        } catch (error) {
            console.error(`OOPS: ${error}`);
        }
    });

    // REMOVE ROLES
    client.on(Events.MessageReactionRemove, async (reaction, user) => {

        if (!reaction.message.guildId) 
            return;

        if (user.bot) 
            return;

        const emojiId = reaction.emoji.id ? `<:${reaction.emoji.name}:${reaction.emoji.id.toString()}>` : reaction.emoji.name;

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

            
        //sends the message to the bot commands channel
            const targetChannel = guild.channels.cache.get(targetChannelId);

            
            if (targetChannel) {
                await targetChannel.send({ embeds: [colourRemovalEmbed] });
            } else {
                console.error(`Target channel with ID ${targetChannelId} not found.`);
            }


        } catch (error) {
            console.error(`OOPS: ${error}`);
        }
    });


}
