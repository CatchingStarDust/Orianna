//For registering commands. RUN "node src\deployCommands.js" whenever you update the code of the command.

require('dotenv').config();
console.log(process.env.TOKEN);

const { REST, Routes,} = require('discord.js');


// put in name and description for the command that you will see in Discord
const commands = [
    {
        name: 'daily',
        description: 'Gives you your daily capsule',
    },
//---------
    {
        name: 'inventory',
        description: "Check your inventory",
    },
//------
    {
        name: 'open-basic-capsule',
        description: "Open for a chance at one of the basic colours!",
    },

//------
    {
        name: 'react-role',
        description: "Create reaction messages to assign roles.",
    },


    
];

//this bit is what actually registers the command

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );
        console.log('Slash command registered:', data);
    } catch (error) {
        console.error('There was an error:', error);
    }
})();
