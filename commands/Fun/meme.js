const Discord = require('discord.js');
// const superagent = require('superagent');
const fetch = require('node-fetch');

module.exports = {
    name: 'meme',
    helpName: 'Meme',
    category: 'Fun',
    // aliases: [],
    cooldown: 5,
    usage: 'meme',
    description: 'Shows a random meme, because sometimes you have to actually laugh out loud',

    run: async(bot, message, args) => {
        let msg = await message.channel.send('Generating...');
        const url = 'https://apis.duncte123.me/meme';

        fetch(url).then(res => {
            return res.json();
        }).then(val => {
            let mEmbed = new Discord.MessageEmbed()
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