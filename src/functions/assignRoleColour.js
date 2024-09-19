// where the bot gives users their colours
module.exports = (client) => {

    const {Events, EmbedBuilder } = require('discord.js');
    const reactionSchema = require('../schemas/roleColourData.js');
    const UserProfile = require('../schemas/UserProfile.js');
    
    /* when someone reacts 
    to a post with 
    the assigned emojis*/
    client.on(Events.MessageReactionAdd, async (reaction, user) => {
        
        
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

        const colourData = await reactionSchema.findOne({ 
            Guild: reaction.message.guild.id, 
            Message: reaction.message.id, 
            Emoji: emojiId 
        });


            if (!colourData) return;

        const guild = reaction.message.guild;
        const member = guild.members.cache.get(user.id);
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
