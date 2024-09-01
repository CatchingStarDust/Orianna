//Main hub that connects command creation.

require('dotenv').config();

// libraries the bot needs access to
const { Client, GatewayIntentBits, Events, EmbedBuilder  } = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const reactionSchema = require('./schemas/roleColourData.js');
const UserProfile = require('./schemas/UserProfile.js');

// where intents go (the bot needs permissions to do things)
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions,
        // Add other intents here
    ],
});

client.commands = new Map();

// Imports command files 
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(__dirname, 'commands', file));
    if (!command.data || !command.data.name) {
        console.error(`The command at ${file} is missing a 'data' property or 'name'.`);
        continue;
    }
    client.commands.set(command.data.name, command);
}

// signals that Ori is online
client.once(Events.ClientReady, () => {
    console.log(`${client.user.tag} has arrived. We go.`);
});

// handles command interactions
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error executing command: ${error}`);
        await interaction.reply({ content: 'There was an error executing this command.', ephemeral: true });
    }
});

// signals that Ori is connected to the Mongoose database
(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to the database");

        await client.login(process.env.TOKEN);
    } catch (error) {
        console.error(`Failed to connect to the database or login to Discord: ${error}`);
    }
})();

// equipping roles

//the id of the "bot commands" channel in the server
const targetChannelId = '1145845796005236916';

// when someone reacts to a post with the assigned emojis
client.on(Events.MessageReactionAdd, async (reaction, user) => {

    if (!reaction.message.guildId) 
        return;

    if (user.bot) 
        return;

    const guild = reaction.message.guild;
    const member = guild.members.cache.get(user.id);

    // checks to see if the emoji assigned is a custom or default emoji
    // custom emoji: ori will get the emoji's name as well as its custom id
    // default emoji: ori just gets the name
    // properly formats customs and leaves defaults alone
    let cID = reaction.emoji.id ? `<:${reaction.emoji.name}:${reaction.emoji.id}>` : reaction.emoji.name;

    // variable represents looking in the reaction schema for specific attributes as well as checking for custom emojis
    const data = await reactionSchema.findOne({ Guild: reaction.message.guild.id, Message: reaction.message.id, Emoji: cID, });

    // if the user reacts with an emoji that doesn't exist in the reaction database, ori stops
    if (!data) return;


    // Debugging line
    const userProfile = await UserProfile.findOne({ userId: user.id });
    console.log(`User ID: ${user.id}, Colors Owned: ${userProfile.coloursOwned}`); 
    // Debugging line
    

    const noColourUnlocked = new EmbedBuilder()
        .setColor("Blurple")
        .setDescription(`<@${user.id}>, cannot equip <@&${data.Role}> because they have not unlocked the colour!`);

    // if the user reacts to an emoji that contains the name of a colour that is not in their user profile database
    // ori tells them that they do not own the colour and stops the script
    if (!userProfile.coloursOwned.includes(data.ColourName)) {

        const targetChannel = guild.channels.cache.get(targetChannelId);

        if (targetChannel) {
            await targetChannel.send({ embeds: [noColourUnlocked] });
            return;
        }
    }


    try {
    // ori gives the user the role assigned to the emoji they reacted to
        await member.roles.add(data.Role);

    //confirmation that they were given the role   
    const colourEquipEmbed = new EmbedBuilder()
        .setColor("Blurple")
        .setDescription(`<@${user.id}> has quipped <@&${data.Role}>! looking good!`);

    // if the "colours owned" category in the user's profile does not contain the name(string) of the reaction attached to the post
    // ori will tell them that they don't own the role and stop
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

// removing roles
client.on(Events.MessageReactionRemove, async (reaction, user) => {

    if (!reaction.message.guildId) 
        return;

    if (user.bot) 
        return;

    let cID = reaction.emoji.id ? `<:${reaction.emoji.name}:${reaction.emoji.id}>` : reaction.emoji.name;

    const data = await reactionSchema.findOne({ Guild: reaction.message.guild.id, Message: reaction.message.id, Emoji: cID });
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
