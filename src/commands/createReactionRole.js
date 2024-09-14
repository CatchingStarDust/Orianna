const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const reactionSchema = require('../schemas/roleColourData.js');

module.exports = {
    // the command along with the options that the admin will need to enter every time they want to add a reaction role to a message.
    data: new SlashCommandBuilder()
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
                                        .setRequired(true)) 
        ),

    async execute(interaction) {
        const options = interaction.options;
        const guild = interaction.guild;
        const channel = interaction.channel;
        const sub = options.getSubcommand();
        const emoji = options.getString('emoji');
        const message = await channel.messages.fetch(options.getString('message-id'), true);
        const colourName = options.getString('colour-name'); 

        //makes sure that only people who have the administrator tag can run this command
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
            return await interaction.reply({ content: `You don't have permission to run that!`, ephemeral: true });

        // looks in "reactionSchema" database and searches for a single value in each category that the admin is assigning to the message
        const data = await reactionSchema.findOne({ 
            Guild: guild.id, 
            Message: message.id, 
            Emoji: emoji, 
            ColourName: colourName, });

        let embed;  

        switch (sub) {
            case 'add':
                if (data) {
                    return await interaction.reply({ content: `You already have this reaction using ${emoji} on this message`, ephemeral: true });
                } // if the the new input match the data that has already been used on the same message id, ori stops the admin

            // this variable represents the option in the command that tells ori to get the role that was created in the server
                const role = options.getRole('role');

            /* the attributes of the reaction post 
            the admin created using the command.
            they must have:
            - the posts id number, 
            - be assigned an emoiji, 
            - attached to a role that exists in the server, 
            - and has to be assigned a unique name */

            const ReactionPost = new reactionSchema({
                Guild: guild.id,
                MessageChannel: channel.id,
                Message: message.id,
                Emoji: emoji,
                Role: role.id,
                ColourName: colourName,
            });
                await ReactionPost.save();



                await reactionSchema.findOneAndUpdate(
                    { Guild: guild.id, Message: message.id,},
                    { $set: {
                        MessageChannel: channel.id,
                        Message: message.id,
                        Emoji: emoji, 
                        Role: role.id, 
                        ColourName: colourName, }},
                    { new: true, upsert: true}
                );
                await ReactionPost.save(); 

            //DEBUGGING
                    console.log(data); 
            //DEBUGGING
                    
             // ----------   
                //the embed message that confirms the post has been assigned a reaction role
                embed = new EmbedBuilder()
                    .setColor("Blurple")
                    .setDescription(`Added reaction role to [this message](${message.url}) with ${emoji}, the name "${colourName}", and the role ${role}`);

                // ori waits for a user to click on one of the reaction emojis
                await message.react(emoji);

                await interaction.reply({ embeds: [embed], ephemeral: true });
                break;

            case 'remove':
                if (!data) {
                    return await interaction.reply({ content: `That reaction role does not exist`, ephemeral: true });
                }
            
            // same thing as the code above, but for deleting reactions from posts
                await reactionSchema.deleteMany({
                    Guild: guild.id,
                    Message: message.id,
                    Emoji: emoji,
                    ColourName: colourName,
                });

            // confirms that the reactions were taken off the post
                embed = new EmbedBuilder()
                    .setColor("Blurple")
                    .setDescription(`Removed reaction role to [this message](${message.url}) with ${emoji}`);

                await interaction.reply({ embeds: [embed], ephemeral: true });
                break;
        }
    }
};
