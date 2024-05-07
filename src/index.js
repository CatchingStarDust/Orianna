require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        // Add other intents here
    ],
});

//this initializes an event listener
client.on('ready', (c) => {
    console.log('We go.')
});

//listener for when slash commands are triggered
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'inventory') {
        const userId = interaction.user.id; // Get user ID from interaction
        try {
            let inventory = await UserInventory.findOne({ userId: userId });
            if (!inventory) {
                // Assuming UserInventory.create() is the correct method to create an inventory
                await UserInventory.create({ userId: userId, items: [] });
                inventory = await UserInventory.findOne({ userId: userId });
                await interaction.reply(`Created inventory for ${interaction.user.username}!`);
            } else {
                await interaction.reply('Work in progress!');
            }
        } catch (error) {
            console.error('Failed to fetch inventory:', error);
            await interaction.reply(`The Bot is angry... ${error.message}`);
        }
    }
});


client.on('messageCreate', (message) => {
    //ignore messages from bots
    if (message.author.bot) {
        return;
    }
});

client.login(process.env.TOKEN);