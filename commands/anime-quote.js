// https://animechan.vercel.app/api/random

const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

const quoteFetch = async () => {
	const q = await axios.get('https://animechan.vercel.app/api/random')
		.then(response => response.data)
		.then((quote) => quote);

	return q.quote + '\n  ~ Anime: ' + q.anime + ' - By: ' + q.character ;
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('anime-quote')
		.setDescription('Replies with anime-quotes!'),
	async execute(interaction) {
		await interaction.reply(await quoteFetch());
	},
};
