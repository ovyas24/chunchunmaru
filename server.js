const discord = require('discord.js');
const cron = require('cron');
const axios = require('axios');
const { token } = require('./data/config.json');
const express = require('express');
const app = express();

const intents = new discord.Intents(32767);

const client = new discord.Client({ intents });
const fs = require('fs');
client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// const scheduledMessage = new cron.CronJob('/05 * * * * *', () => {
// 	console.log(' sending -- Scheduled message');

//
// });

const keepAlive = () => {
	setInterval(async () => {
		await axios.get('https://chunchunmaru-bot.herokuapp.com/')
			.then((res) => console.log('Keeping alive +', res.data))
			.catch((err) => console.log(err.message));
	}, 20 * 60 * 1000);
};

console.log('In file below fs');

// eslint-disable-next-line no-shadow
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	// console.log('Interaction created', interaction);
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
	if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	}
	else {
		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

// Login to Discord with your client's token
client.login(token);

app.get('/', (req, res) => {
	res.send('index.html');
});


app.listen(process.env.PORT || 3000, () => {
	keepAlive();
	console.log('running!');
});