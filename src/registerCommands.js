require('dotenv').config();
const { REST, Routes} = require('discord.js');

const commands = [
	{
		name: 'daily',
		description: 'gives you your daily capsule',
	}
];

const rest = new REST ().setToken(process.env.TOKEN);

(async () => {
	try {
		console.log('registering slash commands...');

		await rest.put(
			Routes.applicationGuildCommands(process.env.clientId, process.env.zedKaynHeavenServer),
			{body: commands}
		)

		console.log('slash commands registered.')
	} catch (error) {
		console.log(`there was an error: ${error}`);
	}
})