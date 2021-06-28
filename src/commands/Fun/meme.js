const { Message, MessageEmbed } = require('discord.js');
const Bot = require('../../../index');
const fetch = require('node-fetch');

module.exports = {
    name: 'meme',
    usage: 'meme',
    description: 'Shows a funi haha 100% wholesome reddit chungus meme',

    /**
    * @param {Bot} bot
    * @param {Message} message
    * @param {string[]} args
    */
    run: async(bot, message, args) => {
        let msg = await message.channel.send('Generating...');
        const url = 'https://apis.duncte123.me/meme';
        fetch(url, {
            headers: {
                'User-Agent': 'TeraBytes#4878'
            }
        }).then(res => {
            return res.json();
        }).then(val => {
            let mEmbed = new MessageEmbed()
                .setColor('#ffd700')
                .setImage(val.data.image)
                .setFooter('Powered by ' + url);

            message.channel.send(mEmbed);
            msg.delete();
        }).catch(e => {
            message.channel.send('Oh welps, something guess I couldn\'t get an image, please try again');
            console.log(e);
        });
    }
};