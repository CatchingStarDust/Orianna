// where the bot gives users their colours
module.exports = (client) => {
    const { Client, GatewayIntentBits, Events, EmbedBuilder } = require('discord.js');
    const ReactionPost = require('../schemas/roleColourData.js');
    const UserProfile = require('../schemas/UserProfile.js');

    const targetChannelId = '1145845796005236916';
    


    /* when someone reacts 
    to a post with 
    the assigned emojis*/
    client.on(Events.MessageReactionAdd, async (reaction, user,) => {

        /* DEBUGGING to see if the event 
        is being triggered at all*/
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

        /* checks to see if 
        the emoji assigned is a custom 
        or default emoji*/
        const emojiId = reaction.emoji.id ? `<:${reaction.emoji.name}:${reaction.emoji.id.toString()}>` : reaction.emoji.name;

        /* variable represents looking in 
        the reaction schema for 
        specific attributes as well as 
        checking for custom emojis*/
        const data = await ReactionPost.findOne({ 
            Guild: guildId,  
            Message: messageId, 
            Emoji: emojiId,});

        // DEBUGGING
            if (!data) {
                console.log(`No reaction data found for guild: ${guildId}, message: ${messageId}, emoji: ${emojiId}`);
                return;
            }
        console.log(`Reaction data found: ${JSON.stringify(data)}`);
        // DEBUGGING

        /* checks the user profile to see if 
        the string associated with the role exists
        in the user's profile*/

        const emojiIndex = data.Emoji.indexOf(emojiId);
        const requiredColour = data.ColourName[emojiIndex];
        const userOwnsColour = userProfile.coloursOwned.includes(requiredColour);
        
        /* if the user reacts to an emoji 
        that of a colour that is not 
        in their user profile database,
        ori tells them that they do not own 
        the colour and stops the script */
            if (!userOwnsColour) {
                console.log(`User ${user.tag} does not own any of the colours: ${data.ColourName.join(", ")}`);

        const targetChannel = guild.channels.cache.get(targetChannelId);
        const noColourUnlocked = new EmbedBuilder()
            .setColor("Blurple")
            .setDescription(`<@${user.id}>, cannot equip <@&${data.Role[emojiIndex]}> because they have not unlocked the colour!`);

            if (targetChannel) {
                await targetChannel.send({ embeds: [noColourUnlocked] });
                
            }
            return;
        }

        /* if the user reacts with 
        an emoji that doesn't exist 
        in the reaction database, 
        ori stops */
            if (!data) return;

        try {

            if (emojiIndex === -1) {
                console.log(`Emoji ${emojiId} not found in the data`);
                return;
            }

        /* for loop searches 
        through the list of roles
        attached to the post
        and removes it from the user
        if they already have it equipped */
        const RolesAssignedToReactionPost = data.Role;

        for (const roleId of RolesAssignedToReactionPost) {
            if (member.roles.cache.has(roleId)) {
                await member.roles.remove(roleId);
                console.log(`Removed role ${roleId} from user ${user.tag}`);
            }         
        }

        /* the replacement role */
        const newRole = data.Role[emojiIndex];

                await member.roles.add(newRole);
                console.log(`Role ${data.Role[emojiIndex]} added to user ${user.tag}`);

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
            console.error(`OOPS: ${error}`);
        }
    });

    // REMOVE REACTIONS
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
