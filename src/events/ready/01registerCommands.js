const { zedKaynHeavenServer } = require('../../../config.json');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client) => {
    try {
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client, zedKaynHeavenServer);

        for (const localCommand of localCommands) {
            const { name, description, options } = localCommand;

            const existingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.name === name
            );

            if (existingCommand) {
                if (localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id)
                    console.log('Command deleted.');
                    continue;
                }

                if (areCommandsDifferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id{
                        description,
                        options,
                    });
                    console.log(`edited command ${name}.`)
                } else {
                    if (localCommand.deleted) {
                        console.log(`"${name}" is set to to delete. Skipping.`)
                        continue;
                    }

                    await applicationCommands.create({
                        name,
                        description,
                        options,
                    })

                    console.log(`sucsessfuly registered "${name}" as a command.`)
                }
            }
        }

    } catch (error) {
        console.log(`There was an error: ${error}`)

    }

};