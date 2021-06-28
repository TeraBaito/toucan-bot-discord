const { Message, MessageEmbed } = require('discord.js');
const Bot = require('../../../index');
const fetch = require('node-fetch');

module.exports = {
    name: 'koala',
    usage: 'koala',
    description: 'Gives you a random koala image. Koalas are my fav animal so I needed to do this :D',

    /**
     * @param {Bot} bot 
     * @param {Message} message 
     * @param {string[]} args 
     */
    run: async(bot, message, args) => {
        let msg = await message.channel.send('Generating...');
        const url = 'https://some-random-api.ml/img/koala';

        fetch(url).then(res => {
            return res.json();
        }).then(val => {
            let mEmbed = new MessageEmbed()
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