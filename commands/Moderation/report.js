const Discord = require('discord.js');

module.exports = {
    name: 'report',
    helpName: 'Report',
    category: 'Moderation',
    aliases: ['r'],
    usage: 'report [@user] [reason]',
    description: 'Reports a user and sends the message to a specified channel called #reports. Can be used by all members.\n**Attention:** The channel has to be called #reports.',

    run: async(bot, message, args) => {
        // ;report @TeraBytes bruh moment

        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if(!rUser) return message.channel.send('Couldn\'t find user');

        if(rUser.hasPermission('ADMINISTRATOR') || rUser.hasPermission('BAN_MEMBERS') || rUser.hasPermission('KICK_MEMBERS') || rUser.user.bot) {
            return message.channel.send('This user can\'t be reported');
        }

        const reason = args.slice(1).join(' ');

        if(!reason) return message.channel.send('But there\'s no reason wtf bro');

        

        const rChannel = message.guild.channels.cache.find(channel => channel.name === 'reports');
        if(!rChannel) return message.channel.send('Couldn\'t find reports channel.');

        if(reason && rChannel) {
        let rEmbed = new Discord.MessageEmbed()
        .setDescription('**User Report**')
        .setTimestamp()
        .setColor('#eb8334')
        .addField('Reported User', `${rUser}\nID: ${rUser.id}`)
        .addField('Reported By', `${message.author}\nID: ${message.author.id}`)
        .addField('Channel', message.channel)
        .addField('Reported on', message.createdAt)
        .addField('**Reason**', reason);

        message.delete().catch(O_o => {})
        return rChannel.send(rEmbed);
        }
    
    }
}