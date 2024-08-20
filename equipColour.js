const { SlashCommandBuilder } = require('@discordjs/builders');
const UserProfile = require('../schemas/UserProfile');
const role = require('../schemas/roleColourData.js');

module.exports = {

    // this 
async execute(interaction) {

        await interaction.deferReply();

        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'colour')
            interaction.editReply("choosing a colour...")
      },
    
data: new SlashCommandBuilder()
    .setName('equip')
    .setDescription('use any of the colours you have')
    .addSubcommand((subcommand) => 
        subcommand
    .setName('colour')
    .setDescription('choose a colour'))
    .addUserOption((option) => 
        option
    .setName('role-colour')
    .setDescription('the role colours here').setRequired(true))

    




};
        



