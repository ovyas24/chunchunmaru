const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

const tellJoke = async () => {
	const joke = await axios.get('https://v2.jokeapi.dev/joke/any')
		.then(res => {
			if (res.data.type == 'twopart') {
				const setup = res.data.setup;
				const delivery = res.data.delivery;
				return setup + ' \n' + delivery;
			}

			return res.data.joke;
		});

	return joke;
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('joke')
		.setDescription('Replies with joke!'),
	async execute(interaction) {
		await interaction.reply(await tellJoke());
	},
};
