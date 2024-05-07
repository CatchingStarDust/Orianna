require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'ping',
        description: 'replies with pong',
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