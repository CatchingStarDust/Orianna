require('dotenv').config();
const mongoose = require('mongoose');
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
    if (!interaction.isChatInputCommand()) return;

    // all created commands
    if (interaction.commandName === 'inventory') {
        const userId = interaction.user.id; // Get user ID from interaction

            try {
                async function findUserInventory() {
                    await mongoose.connect('mongodb://localhost:27017/discordBotDB');
                    mongoose.model('userinventoryDB', userInventorySchema);

                    await mongoose.model('userinventoryDB').findOne();
                };

                if (!findUserInventory) {
                    await userInventory.create({ userId: userId, items: [] });
                    inventory = await UserInventory.findOne({ userId: userId });
                    await interaction.reply(`Created inventory for ${interaction.user.username}!`);
                } else {
                    await interaction.reply({ embeds: [genericEmbed] });
                };
            }

            catch (error) {
                console.error('Error in inventory command:', error);
                await interaction.reply({ embeds: [errorMsgEmbed(interaction, error)] });
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