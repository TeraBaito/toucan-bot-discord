const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'cat',
    helpName: 'Cat',
    category: 'Fun',
    // aliases: [],
    cooldown: 5,
    usage: 'cat',
    description: 'Shows a niceu cute cat image',

    run: async(bot, message, args) => {
        let msg = await message.channel.send('Generating...');
        const url = 'https://some-random-api.ml/img/cat';

        fetch(url).then(res => {
            return res.json();
        }).then(val => {
            let mEmbed = new Discord.MessageEmbed()
                .setColor('#ffd700')
                .setImage(val.link)
                .setFooter('Powered by ' + url);

            message.channel.send(mEmbed);
            msg.delete();
        }).catch(e => {
            message.channel.send('Oh welps, something guess I couldn\'t get an image, please try again');
            console.log(e);
        });
    }
};