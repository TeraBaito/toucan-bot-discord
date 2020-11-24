const Discord = require('discord.js');
const { getMember, formatDate } = require('../../handlers/functions.js');

module.exports = {
    name: 'user-info',
    helpName: 'User Information',
    category: 'Utilities',
    aliases: ['profile', 'user', 'whois'],
    usage: 'user-info ({@user, ID})',
    description: 'Sends the general information of a guild member.\n**Attention:** Only @mentions and user IDs work, `;user-info Cookie` doesn\'t work.',

    run: async (bot, message, args) => {
        const member = getMember(message, args.join(' '));

        // Information Variables

        // pfp
        const uIcon = member.user.displayAvatarURL();

        // user roles as strings
        let uRoles = member.roles
            .cache.filter(r => r.id !== message.guild.id)
            .map(r => r)
            .join(' ')  || 'none';
            
        // discord creation and server join date
        const uCreated = formatDate(member.user.createdAt);
        const sJoined = formatDate(member.joinedAt);
        
        // if the embed is more than 1024 chars it will error
        if (uRoles.length > 650) uRoles = 'Too much roles to show!';
        
        // embed
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
            .addField('Roles Count', member.roles.cache.size)
            .addField('Roles', uRoles, true)
            .setTimestamp();

        message.channel.send(userEmbed);
        // console.log(uRoles.split(/ +/g).length);
        // console.log(uRoles.length);
    }
};
