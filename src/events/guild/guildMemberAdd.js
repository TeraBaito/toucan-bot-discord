const { MessageEmbed, GuildMember } = require('discord.js');
const Bot = require('../../../index');
const { formatDate, unhoistOne } = require('../../handlers/functions');
const { alexServerID } = require('../../../config.json');
const colors = require('../../../colors.json');

/**
 * `guildMemberAdd` event.
 * 
 * Emitted whenever a user joins a guild.
 * 
 * @param {Bot} bot
 * @param {GuildMember} member 
 */
module.exports = async (bot, member) => {
    if (member.guild.id != alexServerID) return;
    
    const mEmbed = new MessageEmbed()
        .setColor(colors.Olive)
        .setTitle('Member Joined')
        .addField('Name', member.displayName, true)
        .addField('ID', member.id, true)
        .addField('Joined Server', formatDate(member.joinedAt))
        .addField('Joined Discord', formatDate(member.user.createdAt))
        .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true }));

    bot.guilds.cache.get(alexServerID).channels.cache.find(ch => ch.name == 'new-members').send(mEmbed);
    unhoistOne(member);
};