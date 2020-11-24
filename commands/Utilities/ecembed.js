const Discord = require('discord.js'),
    colors = require('../../colors.json');

module.exports = {
    name: 'ecembed',
    helpName: 'Edit JSON Embed',
    category: 'Utilities',
    aliases: ['editjsonembed'],
    usage: 'ecembed [message-id] [channel] [json-embed]',
    description: 'Edits an embed message using JSON format to the specified channel',

    run: async(bot, message, args) => {
        let channel = message.mentions.channels.first() ||
        message.guild.channels.cache.find(c => c.id == args[1]) ||
        message.guild.channels.cache.find(c => c.name == args[1]);

        

        try {
            let jsonEmbed = JSON.parse(args.slice(2).join(' '));
            channel.messages.fetch(args[0])
                .then(msg => {
                    msg.edit(jsonEmbed);
                    message.channel.send('Successfully edited embed!');
                });

        } catch (e) {
            const errEmbed = new Discord.MessageEmbed()
                .setColor(colors.Red)
                .setTitle('Error')
                .setDescription(e)
                .setFooter(bot.user.username, bot.user.displayAvatarURL);
            
            message.channel.send(errEmbed);
        }
    }
};