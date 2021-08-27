const discord = require('discord.js');
const { token } = require('./data/config.json');
const express = require('express');
const cron = require('cron');
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

let guild;

const scheduledMessage = new cron.CronJob('*/05 * * * * *', () => {
	console.log(' sending -- Scheduled message');
	const channel = guild.channels.cache.get('688735716871897145');
	channel.send('Server activation message!!');
});

console.log('In file below fs');

// eslint-disable-next-line no-shadow
client.once('ready', (client) => {
	console.log('Ready!');
	guild = client.guilds.cache.get('688735716867702818');
	scheduledMessage.start();
});

client.on('interactionCreate', async interaction => {
	console.log('Interaction created', interaction);
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	}
	else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	}
	else if (commandName === 'beep') {
		await interaction.reply('Boop!');
	}

	else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
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
	console.log('running!');
});