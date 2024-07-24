require('dotenv').config();
console.log(process.env.TOKEN);

const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

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

//---------
    {
        name: 'opencapsule',
        description: "open a capsule",
        options: [
            {
                name: 'select-capsule',
                description: 'which capsule do you want to open?',
                type: ApplicationCommandOptionType.Number,
                required: true,
                choices: [
                    {
                        name: 'Basic Capsule',
                        value: 1,
                    }
                ],
        
                //add additional capsules here
            },
        ]
    },
    
];

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
