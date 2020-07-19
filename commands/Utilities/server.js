const Discord = require('discord.js');

module.exports = {
    name: 'server',
    helpName: 'Server Information',
    category: 'Utilities',
    aliases: ['server-info'],
    usage: 'server',
    description: 'Server information',

    run: async (bot, message, args) => {

        let sIcon = message.guild.iconURL();
        let serverEmbed = new Discord.MessageEmbed()
            .setDescription('**Server Information**')
            .setColor('#5c34eb')
            .setThumbnail(sIcon)
            .addField('Server Name', message.guild.name)
            .addField('Server ID', message.guild.id)
            .addField('Created On', message.guild.createdAt)
            .addField('Member Count', message.guild.memberCount)
            .addField('Channel Count', message.guild.channels.cache.size)
            .addField('Server Owner', message.guild.member(message.guild.owner) ? message.guild.owner.toString() : message.guild.owner.user.tag);
    
        return message.channel.send(serverEmbed);
    }
};