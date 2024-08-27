const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('@discordjs/builders');
const UserProfile = require('../schemas/UserProfile');
const reaction = require ('../schemas/roleColourData')



    module.exports = {
        data: new SlashCommandBuilder()
        .setName('equip-role')
        .setDescription('Members use this to choose colours')
        .addSubcommand(command => 
            command.setName('add')
            .setDescription('add a reaction role to a message')
            .addStringOption(option => 
                option.setName('message-id')
                .setDescription('the message to react to')
                .setRequired(true))
                .addStringOption(option => 
                    option.setName('emoji')
                    .setDescription('the emoji to react with')
                    .setRequired(true))
                    .addRoleOption(option => 
                        option.setName('role')
                        .setDescription('the role you want to give')
                        .setRequired(true))
                    )

        .addSubcommand(command => 
            command.setName('remove')
             .setDescription('remove a reaction role to a message')
             .addStringOption(option => 
                    option.setName('message-id')
                    .setDescription('the message to react to')
                    .setRequired(true))
                    .addStringOption(option => 
                        option.setName('emoji')
                        .setDescription('the emoji to react with')
                        .setRequired(true))
                        

                     ),
                     
        async execute (interaction){

            const [options, guild, channel] = interaction;
            const sub = options.getSubCommand();
            const emoji = options.getString('emoji');

            const message = await channel.messages.fetch(options.getString('message-id'))

            if (!interaction.member.permission.has(PermissionsBitField.Flag.Administrator))
                return await interaction.reply({content: `You don't have permission to run that!`, ephemeral: true});

            const data = await reaction.findOne({Guild: guild.id, Message: message.id, Emoji: emoji});

            switch (sub) {
                case 'add':
                    
            }
            

            
            
            

        }

    }     



























// ...........other code

module.exports = {
    data: new SlashCommandBuilder()
        .setName('equip')
        .setDescription('Members use this to choose colours')
        .addSubcommand((subcommand) =>
            subcommand.setName('colour')
                .setDescription('Choose a colour')
                .addStringOption((option) =>
                    option.setName('role-colour')
                        .setDescription('The role colour you want to equip')
                        .setAutocomplete(true)
                        .setRequired(true)
                )
        ),

async autocomplete(interaction) {
    const focusedOption = interaction.options.getFocused();
    const roles = interaction.guild.roles.cache.filter(role => role.name.toLowerCase().startsWith(focusedOption.toLowerCase()));
    
    const choices = roles.map(role => ({ name: role.name, value: role.name })).slice(0, 25); // limit of 25 options (Discord's limit)
            
            await interaction.respond(choices);
        },

async execute(interaction) {

            await interaction.deferReply();

    const availableColours = [
            //basic 
                'Red', 
                'Yellow', 
                'Orange', 
                'Green', 
                'Blue', 
                'Purple', 
                'Pink', 
                'Seafoam', 
                'Grey', 
                'slate', 
            //holiday 
                'RibbonRed', 
                'NerotBlue', 
                'MistletoeGreen', 
                'SnowflakeWhite', 

            ];
    
    const roleColour = interaction.options.getString('role-colour');
    const selectedRole = interaction.guild.roles.cache.find(r => r.name.toLowerCase() === roleColour.toLowerCase());

        // check if the the selected color is valid
    
        if (!selectedRole || !availableColours.map(c => c.toLowerCase()).includes(roleColour.toLowerCase())) {
                return await interaction.editReply(`Role "${roleColour}" is not a valid color role.`);
            }

        //check if the user owns the colour
let serverMember = await UserProfile.findOne({ userId: interaction.user.id });

        if (!serverMember || !serverMember.ownedColours.map(c => c.toLowerCase()).includes(roleColour.toLowerCase())) {
                return await interaction.editReply(`You do not own the color "${roleColour}". In order to use this colour, you need to find it in a capsule!`);
}



        // if the user owns the colour, the bot equips it.
        try {

            await interaction.member.roles.add(selectedRole);

            await interaction.editReply(`You have equipped ${selectedRole.name}, looking good!`);

        
    } catch (error) {

        console.error(`Error: ${error}`);
            await interaction.editReply({ content: `There was an error: ${error.message}`, ephemeral: true });
    

    }
}

        
};
