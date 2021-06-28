const { Message, MessageEmbed } = require('discord.js');
const Bot = require('../../../index');
const fetch = require('node-fetch');

module.exports = {
    name: 'cat',
    usage: 'cat',
    description: 'Shows a niceu cute cat image',

    /**
    * @param {Bot} bot
    * @param {Message} message
    * @param {string[]} args
    */
    run: async(bot, message, args) => {
        let msg = await message.channel.send('Generating...');
        const url = 'http://aws.random.cat/meow';

        fetch(url).then(res => {
            return res.json();
        }).then(val => {
            let mEmbed = new MessageEmbed()
                .setColor('#ffd700')
                .setImage(val.file)
                .setFooter('Powered by ' + url);

            message.channel.send(mEmbed);
            msg.delete();
        }).catch(e => {
            message.channel.send('Oh welps, something guess I couldn\'t get an image, please try again');
            console.log(e);
        });
    }
};