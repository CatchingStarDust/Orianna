const { devs, zedKaynHeavenServer } = require('../../../config.js');
const getLocalCommands = require('../../utils/getLocalCommands.js');

module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand) return;
    const localCommand = getLocalCommands();

    try {
        const commandObject = localCommands.find(
            (cmd) => cmd.name === interaction.commandName
        );

        if (!commandObject) return;

        if (commandObject.devOnly) {
            if (!devs.includes(interaction.member.id)) {
                interaction.reply({
                    content: 'Sorry, only admins can run this command.',
                    ephemeral: true,
                });
                return;
            }

            if (commandObject.testOnly) {
                if (!(interaction.guild === zedKaynHeavenServer)) {
                    interaction.reply({
                        content: 'Sorry, this command cannot be ran.',
                        ephemeral: true,
                    });
                    return;
                }
            }

            if (commandObject.permissionsRequired?.length) {
                for (const permission of commandObject.permissionsRequired) {
                    if (!interaction.member.permissions.has(permission)) {
                        interaction.reply({
                            content: `You don't have enough permissions to use this command.`,
                            ephemeral: true,
                        });
                        return;
                    }
                }
            }

        }
    } catch (error) {
        interaction.reply(`There was an error: ${error}`)

    }

};

