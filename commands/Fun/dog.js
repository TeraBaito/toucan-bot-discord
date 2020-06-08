const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'dog',
    helpName: 'Dog',
    category: 'Fun',
    // aliases: [],
    cooldown: 5,
    usage: 'dog',
    description: 'Shows a random doggo image :3',

    run: async(bot, message, args) => {
        let msg = await message.channel.send('Generating...');
        const url = 'https://dog.ceo/api/breeds/image/random';

        fetch(url).then(res => {
            return res.json();
        }).then(val => {
            let dEmbed = new Discord.MessageEmbed()
                .setColor('#ffd700')
                .setImage(val.message)
                .setFooter('Powered by ' + url);

            message.channel.send(dEmbed);
            msg.delete();
        }).catch(e => {
            message.channel.send('Oh welps, something guess I couldn\'t get an image, please try again');
            console.log(e);
        });
    }
};