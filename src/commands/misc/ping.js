module.exports = {
    name: 'ping',
    description: ' A test command. Replies with pong',
    // devOnly: boolean,
    // testOnly: boolean,
    // options: object[],
    // deleted: boolean,

    callback: (client, interaction) => {
        interaction.reply(`Pong! ${client.ws.ping}ms`);
    },
};