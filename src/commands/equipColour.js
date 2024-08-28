const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const UserProfile = require('../schemas/UserProfile.js');
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
        ),

    async execute(interaction) {
        const options = interaction.options;
        const guild = interaction.guild;
        const channel = interaction.channel;
        const sub = options.getSubcommand();
        const emoji = options.getString('emoji');
        const message = await channel.messages.fetch(options.getString('message-id'));

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
            return await interaction.reply({ content: `You don't have permission to run that!`, ephemeral: true });

        const data = await reactionSchema.findOne({ Guild: guild.id, Message: message.id, Emoji: emoji });

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
                    Role: role.id
                });

                embed = new EmbedBuilder()
                    .setColor("Blurple")
                    .setDescription(`Added reaction role to [this message](${message.url}) with ${emoji} and the role ${role}`);

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
                });

                embed = new EmbedBuilder()
                    .setColor("Blurple")
                    .setDescription(`Removed reaction role to [this message](${message.url}) with ${emoji}`);

                await interaction.reply({ embeds: [embed], ephemeral: true });
                break;
        }
    }
};
