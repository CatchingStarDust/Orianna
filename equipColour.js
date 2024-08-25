const { SlashCommandBuilder, } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('equip')
        .setDescription('Members use this to choose colours')
        .addSubcommand((subcommand) =>
            subcommand.setName('colour')
                .setDescription('Choose a colour')
                .addStringOption((option) => option.setName('role-colour')
                        .setDescription('The role colour you want to equip')
                        .setRequired(true)
                )
        ),

    run: async ({ interaction }) => {
        await interaction.deferReply();

        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'colour') {
            const roleColour = interaction.options.getString('role-colour');

            // Your logic for equipping the role with the selected color.

            await interaction.editReply(`You chose the colour: ${roleColour}`);
        }
    },
};
