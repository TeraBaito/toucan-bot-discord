const Discord = require('discord.js');
const fs = require('fs');
const {getMember, formatDate } = require('../../functions.js');

module.exports = {
    name: 'user-info',
    helpName: 'User Information',
    category: 'Utilities',
    aliases: ['profile', 'user', 'whois'],
    usage: 'user-info ({@user, ID})',
    description: 'Sends the general information of a guild member.\n**Attention:** Only @mentions and user IDs work, `;user-info Cookie` doesn\'t work.',

    run: async (bot, message, args) => {
        const member = getMember(message, args.join(' '));

        //Information Variables
        const uIcon = member.user.displayAvatarURL();
        const uRoles = member.roles
            .cache.filter(r => r.id !== message.guild.id)
            .map(r => r)
            .join(', ')  || 'none';    
        const uCreated = formatDate(member.user.createdAt);

        const sJoined = formatDate(member.joinedAt);
        
        
        const userEmbed = new Discord.MessageEmbed()
            .setDescription('**User Information**')
            .setFooter(member.displayName, uIcon)
            .setThumbnail(uIcon)
            .setColor('#3474eb')
            .addField('Display Name', member.displayName)
            .addField('Username', member.user.tag)
            .addField('User ID', member.user.id)
            .addField('Joined Discord On', member.user.createdAt)
            .addField('Joined Server On', sJoined)
            .addField('Roles', uRoles, true)
            .setTimestamp();

        return message.channel.send(userEmbed);
    }
};
