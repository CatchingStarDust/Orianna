//For registering commands. RUN "node src\deployCommands.js" whenever you update the code of the command.

require('dotenv').config();
console.log(process.env.TOKEN);

const { REST, Routes,} = require('discord.js');


// put in name and description for the command that you will see in Discord
const commands = [
    {
        name: 'get-capsule',
        description: 'Gives you some capsules!',
    },
    {
        name: 'new-open-capsule-beta',
        description: 'BETA: open a single capsule that contains all colours in it!',
    },
    {
        name: 'inventory',
        description: "Check your inventory",
    },
    {
        name: 'open-basic-capsule',
        description: "Open for a chance at one of the basic colours!",
    },
    {
        name: 'open-autumn-capsule',
        description: "Open for a chance to get a cozy Autumn-themed colour!",
    },
    {
        name: 'react-role',
        description: "Create reaction messages to assign roles.",
        options: [
            {
                name: 'add',
                description: 'Add a reaction role to a message',
                type: 1, // this option is establishing a subcommand
                options: [
                    {
                        name: 'message-id',
                        description: 'The message to react to',
                        type: 3, // this option accepts string inputs
                        required: true,
                    },
                    {
                        name: 'emoji',
                        description: 'The emoji to react with',
                        type: 3, //this option accepts string inputs
                        required: true,
                    },
                    {
                        name: 'role',
                        description: 'The role you want to give',
                        type: 8, // this option assigns a role
                        required: true,
                    },
                    {
                        name: 'colour-name',
                        description: 'the color name associated with the role (Names are lower-case with no spaces)',
                        type: 3, // this option accepts string inputs
                        required: true,
                    }
                ]
            },
            {
                name: 'remove',
                description: 'Remove a reaction role from a message',
                type: 1,
                options: [
                    {
                        name: 'message-id',
                        description: 'The message to react to',
                        type: 3,
                        required: true,
                    },
                    {
                        name: 'emoji',
                        description: 'The emoji to remove',
                        type: 3,
                        required: true,
                    },
                    {
                        name: 'colour-name',
                        description: 'the color name associated with the role (Names are lower-case with no spaces)',
                        type: 3,
                        required: true,
                    },
                ]
            }
        ]
    }
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
