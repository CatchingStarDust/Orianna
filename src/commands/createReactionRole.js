const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const ReactionPost = require('../schemas/roleColourData.js');


const reactionRoleSlashCommand = new SlashCommandBuilder()
        .setName('react-role')
        .setDescription('Members use this to choose colours')
        .addSubcommand(command => 
            command
            .setName('add')
            .setDescription('add a reaction role to a message')
            .addStringOption(option => 
                    option
                        .setName('message-id') // user needs the  id number of the message they want to attach the reaction to
                        .setDescription('the message to react to')
                        .setRequired(true))
                            .addStringOption(option => 
                                option
                                    .setName('emoji') // sets the emoji that will represent the role users will equip when they click it
                                    .setDescription('the emoji to react with')
                                    .setRequired(true))
                                    .addRoleOption(option => 
                                        option
                                            .setName('role') // the user chooses what role to associate with the emoji above
                                            .setDescription('the role you want to give')
                                            .setRequired(true))
                                                .addStringOption(option => 
                                                    option
                                                        .setName('colour-name') // assigns the name variable that is associated with the reaction.
                                                        // the name must be a string                                           
                                                        .setDescription('the colour name associated with the role (Names are lower-case with no spaces)')
                                                        .setRequired(true))  
    )
    .addSubcommand(command => 
        command
        .setName('remove') // same thing as above, but this is to remove the reaction data from the message id
        .setDescription('remove a reaction role to a message')
        .addStringOption(option => 
            option
                .setName('message-id')
                .setDescription('the message to react to')
                .setRequired(true))
                    .addStringOption(option => 
                        option
                            .setName('emoji')
                            .setDescription('the emoji to react with')
                            .setRequired(true))
                            .addStringOption(option => 
                                option
                                    .setName('colour-name')
                                    .setDescription('the colour name associated with the role (Names are lower-case with no spaces)')
                                    .setRequired(true)));


// saving a reaction role post
const saveReactionRoleToDataBase = async (guildId, channelId, messageId, emoji, roleId, colourName) => {
    const newReaction = new ReactionPost({
        Guild: guildId,
        MessageChannel: channelId,
        Message: messageId,
        Emoji: emoji,
        Role: roleId,
        ColourName: colourName,
    });
    await newReaction.save();
    console.log('Reaction Role saved to DB:', newReaction);
};

// handling the command execution
const reactionRoleCommands = async (interaction) => {
    const options = interaction.options;
    const guild = interaction.guild;
    const channel = interaction.channel;
    const sub = options.getSubcommand();
    const emoji = options.getString('emoji');
    const message = await channel.messages.fetch(options.getString('message-id'), true);
    const colourName = options.getString('colour-name'); 

    const data = await ReactionPost.findOne({ 
        Guild: guild.id, 
        Message: message.id, 
        Emoji: emoji, 
        ColourName: colourName,
    });

    let embed;

    switch (sub) {
        case 'add':
            if (data) {
                return await interaction.reply({ content: `You already have this reaction using ${emoji} on this message`, ephemeral: true });
            }

            try {
                const role = options.getRole('role');
            await saveReactionRoleToDataBase(guild.id, channel.id, message.id, emoji, role.id, colourName);

            // Add reaction to the message
            await message.react(emoji);

            // Send confirmation
            embed = new EmbedBuilder()
                .setColor("Blurple")
                .setDescription(`Added reaction role to [this message](${message.url}) with ${emoji}, the name "${colourName}", and the role ${role}`);

            await interaction.reply({ embeds: [embed], ephemeral: true });
            break;
            } catch (error) {
                console.error(`Error: ${error}`);
                await interaction.editReply({ content: `There was an error: ${error.message}`, ephemeral: true });
                }

        case 'remove':
            if (!data) {
                return await interaction.reply({ content: `That reaction role does not exist`, ephemeral: true });
            }

            await ReactionPost.deleteMany({
                Guild: guild.id,
                Message: message.id,
                Emoji: emoji,
                ColourName: colourName,
            });

            embed = new EmbedBuilder()
                .setColor("Blurple")
                .setDescription(`Removed reaction role to [this message](${message.url}) with ${emoji}`);

            await interaction.reply({ embeds: [embed], ephemeral: true });
            break;
    }
};

// Export the individual parts
module.exports = { 
    data: reactionRoleSlashCommand, 
    execute: reactionRoleCommands, saveReactionRoleToDataBase, };