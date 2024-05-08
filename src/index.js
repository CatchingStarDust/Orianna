require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { genericEmbed, errorMsgEmbed } = require('./embeds');
const { userInventory } = require('./userinventoryDB.js')

//--------------------------------------------------
//  where intents go (the bot needs permissions to do things)
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        // Add other intents here
    ],
});

//----------------------------------------------------------------------
//initializes an event listener
client.on('ready', (c) => {
    console.log('We go.')
});

//----------------------------------------------------------------------
//listener for when slash commands are triggered
client.on('interactionCreate', async (interaction) => {

    // server icon
    const guildIcon = interaction.guild.iconURL({ dynamic: true, size: 512 });
    if (!interaction.isChatInputCommand()) return;

    // all created commands
    if (interaction.commandName === 'inventory') {
        const userId = interaction.user.id; // Get user ID from interaction
        try {
            let inventory = await userInventory.findOne({ userId: userId });
            if (!inventory) {
                await userInventory.create({ userId: userId, items: [] });
                inventory = await UserInventory.findOne({ userId: userId });
                await interaction.reply(`Created inventory for ${interaction.user.username}!`);
            } else {
                await interaction.reply({ embeds: [genericEmbed] });
            }
        } catch (error) {
            console.error('Failed to fetch inventory:', error);
            await interaction.reply({ embeds: [errorMsgEmbed] });

        }


    }
});

//----------------------------------------------------------------------
//ignore messages from bots
client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }
});

client.login(process.env.TOKEN);