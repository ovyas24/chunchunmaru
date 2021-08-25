// https://meme-api.herokuapp.com/gimme

const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

const memeFetch = async () => {
	const url = await axios.get('https://meme-api.herokuapp.com/gimme')
		.then(res => {
			return res.data.url;
		});

	return url;
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Replies with meme'),
	async execute(interaction) {
		await interaction.reply(await memeFetch());
	},
};
