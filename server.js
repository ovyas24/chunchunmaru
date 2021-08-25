/** @format */

const discord = require("discord.js");
const config = require("./data/config.json");
const axios = require("axios");

const getJoke = async (type) => {
    const types = type ? type : 'Dark';
    const joke = await axios.get(`https://v2.jokeapi.dev/joke/${types}`)
                            .then(res => {
                                if(res.data.type == 'twopart'){
                                    const setup = res.data.setup
                                    const delivery = res.data.delivery
                                    return  setup+" \n"+delivery;
                                }

                                return res.data.joke
                            })

    return joke;
}

const intents = new discord.Intents(32767);

const client = new discord.Client({ intents });

const greetings = new Set([ "hello", "hi", "hey", "helo" ])
console.log(greetings);

console.log("running....")

client.on("ready", () => {
    console.log("Bot is online now!")
})

client.on("messageCreate", async (message) => {
    const user = message.author.username
    const msg = message.content.slice(1)
    console.log(user)
    if(user === 'Reborn55m') message.reply('I love reborn ❤️')
    if(message.content.toLowerCase() === 'i love you' ){
        message.reply('🤣 but no one loves you 🤣🤣🤣🤣🤣')
    }
    if(message.content.toLowerCase() === 'fuck you') message.reply('No, Fuck You!')
    if(message.content[0] === '!'){
        if(user === 'SaGaR') message.reply(`Fuck You`)
        if(greetings.has(msg.toLowerCase())) {
            message.reply(`Hello @${user}`);
        }
        else message.reply("Wtf are you taking about! Try again!") 
    }
    else if(message.content[0] === '/'){
        const [command, para] = msg.split('-')
        if(command === 'joke'){
            const joke = await getJoke(para)
            message.reply(joke)
        }

        if(command === 'vote'){
            const [opt1, opt2] = type.split(':');
            message.reply(`Voting : ❤️ - ${opt1} or 💙 - ${opt2}`)
            message.react('❤️').then(() => message.react('💙'));
            message.react('💙').then(() => message.react('❤️'));
        }
    }
})

client.login(config.token);
