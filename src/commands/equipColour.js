const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const reactionSchema = require('../schemas/roleColourData.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('react-role')
        .setDescription('Members use this to choose colours')
        .addSubcommand(command => 
            command
            .setName('add')
            .setDescription('add a reaction role to a message')
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
                                    .addRoleOption(option => 
                                        option
                                            .setName('role')
                                            .setDescription('the role you want to give')
                                            .setRequired(true))
                                                .addStringOption(option => 
                                                    option
                                                        .setName('colour-name')
                                                        .setDescription('the colour name associated with the role (Names are lower-case with no spaces)')
                                                        .setRequired(true))  
        )
        .addSubcommand(command => 
            command
            .setName('remove')
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
        const message = await channel.messages.fetch(options.getString('message-id'));
        const colourName = options.getString('colour-name'); 
        //debugging code
        console.log(`Retrieved colourName: ${colourName}`);
        //debugging code

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
            return await interaction.reply({ content: `You don't have permission to run that!`, ephemeral: true });

        const data = await reactionSchema.findOne({ Guild: guild.id, Message: message.id, Emoji: emoji, ColourName: colourName });

        let embed;  

        switch (sub) {
            case 'add':
                if (data) {
                    return await interaction.reply({ content: `You already have this reaction using ${emoji} on this message`, ephemeral: true });
                }

                const role = options.getRole('role');

                await reactionSchema.create({
                    Guild: guild.id,
                    Message: message.id,
                    Emoji: emoji,
                    Role: role.id,
                    ColourName: colourName,
                });
                

                embed = new EmbedBuilder()
                    .setColor("Blurple")
                    .setDescription(`Added reaction role to [this message](${message.url}) with ${emoji}, the name "${colourName}", and the role ${role}`);

                await message.react(emoji);

                await interaction.reply({ embeds: [embed], ephemeral: true });
                break;

            case 'remove':
                if (!data) {
                    return await interaction.reply({ content: `That reaction role does not exist`, ephemeral: true });
                }

                await reactionSchema.deleteMany({
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
    }
};
