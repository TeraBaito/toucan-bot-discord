const { GuildMember, MessageEmbed } = require('discord.js');
const Bot = require('../../../index');
const { alexServerID } = require('../../../config.json');
const colors = require('../../../colors.json');

/**
 * `guildMemberRemove` event.
 * 
 * Emitted whenever a user leaves a guild.
 * 
 * @param {Bot} bot
 * @param {GuildMember} member 
 */
module.exports = async (bot, member) => {
    if (member.guild.id != alexServerID) return;

    const mEmbed = new MessageEmbed()
        .setColor(colors.Peru)
        .setTitle('Member Left')
        .addField('Name', member.displayName, true)
        .addField('ID', member.id)
        .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true }));

    // ok cya
    bot.guilds.cache.get(alexServerID).channels.cache.find(ch => ch.name == 'new-members').send(mEmbed);
};