const Discord = require('discord.js');

module.exports = {
    name: 'Not Implemented',
    helpName: 'Play',
    category: 'Music',
    aliases: ['p'],
    usage: 'play [track]',
    description: 'Play a track',

    run: async(bot, message, args) => {
        message.channel.send('Hey, just letting you know the music module is not yet done, ok gn');
    }
};