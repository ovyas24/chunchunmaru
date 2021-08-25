const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

const quoteFetch = async () => {
	const q = await axios.get('https://type.fit/api/quotes')
		.then(res => {
			const quotes = res.data;
			const size = quotes.length;
			const quote = quotes[Math.floor(Math.random() * size)];
			return quote.text + '   \n~' + quote.author;
		});

	return q;
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('inspire')
		.setDescription('Replies with quotes!'),
	async execute(interaction) {
		await interaction.reply(await quoteFetch());
	},
};
