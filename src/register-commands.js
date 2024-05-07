require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'ping',
        description: 'replies with pong',
    },

    //Command that lets you open capsules
    {
        name: 'openCapsule',
        description: 'lets user select which capsule they want to open',
        options: [
            {
                name: 'open',
                description: 'choose which role capsule to open.',
                type: ApplicationCommandOptionType.String
            }
        ]
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

//A check for errors.
(async () => {
    try {
        console.log('Working...')

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )
        console.log('Slash commands regisered sucsessfully.');

    } catch (error) {
        console.log(`The Ball is angry... ${error}`);
    }
})();