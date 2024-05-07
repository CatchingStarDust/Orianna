require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'ping',
        description: 'replies with pong',
    },

    //Command that lets you open capsules
    {
        name: 'opencapsule',
        description: 'lets user select which capsule they want to open',
        options: [
            {
                name: 'capsulenamehere',
                description: 'work in progress!',
                type: ApplicationCommandOptionType.String
            }
        ]
    },
    //lets users check their inventory, and creates one if they don't have one.
    {
        name: 'inventory',
        description: 'check your inventory',
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