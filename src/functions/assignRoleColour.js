// where the bot gives users their colours
const {Events, EmbedBuilder, } = require('discord.js');
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
        console.log(`${emoji}'s role colour: ${colourName}`); //check what emoji and role colour is being accessed
    
        const userProfile = await UserProfile.findOne({ userId: user.id });
    });
        

}