const Discord = require('discord.js');

module.exports = {
    name: 'koala',
    helpName: 'Random Koala',
    category: 'Fun',
    // aliases: [],
    // cooldown: ,
    usage: 'koala',
    description: 'Gives you a random koala image. Koalas are my fav animal so I needed to do this :D',

    run: async(bot, message, args) => {
        let msg = await message.channel.send('Generating...');
        const url = 'https://some-random-api.ml/img/koala';

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