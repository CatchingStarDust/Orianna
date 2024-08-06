const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ComponentType, } = require('discord.js');

const data = {
    name: 'openCapsule',
    description: 'This is where users will open any capsules that they own',
};

async function run({ interaction }) {
    const capsuleInterface = [
        {
            label: 'Basic Capsule',
            description: 'The default server colours',
            value: 'basicCapsuleId', 
        }, 
    ]; 

    const capsuleSelectMenu = new StringSelectMenuBuilder()
        .setCustomId(interaction.id)
        .setPlaceholder('Make a selection...')
        .setMinValues(0)
        .setMaxValues(capsuleInterface.length)
        .addOptions(
            capsuleInterface.map((capsuleInterface) => 
                new StringSelectMenuOptionBuilder()
                    .setLabel(capsuleInterface.label)
                    .setDescription(capsuleInterface.description)
                    .setValue(capsuleInterface.value)
            )
        );

    const capsuleChoices = new ActionRowBuilder().addComponents(capsuleSelectMenu);

    const reply = interaction.reply({components: [capsuleChoices]});

    const collecter = reply.createMessageComponentCollector({
        ComponentType: ComponentType.StringSelect
        filter: (i) => i.user.id === interaction.user.id && i.setCustomId === interaction.id,
        time: 60_000,
    });

    collector.on('collect'. (interaction) => {
        console.log(interaction.values)
    });

}

module.exports = { data, run };