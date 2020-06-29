const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'joke',
    helpName: 'Joke',
    category: 'Fun',
    // aliases: [],
    cooldown: 5,
    usage: 'joke',
    description: 'Shows a random joke, and I hope they\'re funny enough cuz they\'re usually not',

    run: async(bot, message, args) => {
        let msg = await message.channel.send('Generating...');
        const url = 'https://apis.duncte123.me/joke';

        fetch(url).then(res => {
            return res.json();
        }).then(val => {
            let mEmbed = new Discord.MessageEmbed()
                .setColor('#ffd700')
                .setTitle(val.data.title)
                .setDescription(val.data.body)
                .setFooter('Powered by ' + url);

            message.channel.send(mEmbed);
            msg.delete();
        }).catch(e => {
            message.channel.send('Oh welps, something guess I couldn\'t get an image, please try again');
            console.log(e);
        });
    }
};