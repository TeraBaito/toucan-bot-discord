const Discord = require('discord.js');
const fs = require('fs');

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
            .addField('Created On', message.guild.createdAt)
            .addField('Member Count', message.guild.memberCount);
    
        return message.channel.send(serverEmbed);
    }
};