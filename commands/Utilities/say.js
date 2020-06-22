const Discord = require('discord.js');

module.exports = {
    name: 'say',
    helpName: 'Say',
    category: 'Utilities',
    aliases: ['echo'],
    usage: 'say (embed) ...',
    description: 'Takes the argument and sends them back as text, then deletes the command. If the first argument is "embed", it will send an embed.',


    run: async (bot, message, args) => {

        if (message.deletable) message.delete();
        if (args.length < 1) return (await message.channel.send('Bruh you didn\'t even give me a message, what am I supposed to do, read your mind?'));
        if (args[0].toLowerCase() === 'embed') {
            const sayEmbed = new Discord.MessageEmbed()
                .setColor('#228b22')
                .setDescription(args.slice(1).join(' '));
            message.channel.send(sayEmbed);
        } else {
            message.channel.send(args.join(' '));
        }
    }
};