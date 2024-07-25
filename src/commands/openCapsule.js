const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ComponentType } = require('discord.js');
const UserProfile = require('../schemas/UserProfile');
const needServerEmbed = require('../embeds.js');


const data = {
    name: 'openCapsule',
    description: 'Choose a capsule to open',
};

async function run({ interaction }) {
    const capsules = [
        {
            label: 'Basic Capsule',
            description: 'The default server colours',
            value: 'basicCapsuleId', 
        }, 
    ]; 

    const selectMenu = new StringSelectMenuBuilder()
        .setCustomId(interaction.id)
        .setPlaceholder('Make a selection...')
        .setMinValues(0)
        .setMaxValues(capsules.length)
        .addOptions(
            capsules.map((capsule) => 
                new StringSelectMenuOptionBuilder()
                    .setLabel(capsule.label)
                    .setDescription(capsule.description)
                    .setValue(capsule.value)
            )
        );

    const actionRow = new ActionRowBuilder().addComponents(selectMenu);

    interaction.reply({
        components: [actionRow]
    });
}

module.exports = { data, run };