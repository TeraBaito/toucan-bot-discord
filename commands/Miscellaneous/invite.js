const Discord = require('discord.js'),
    { inviteLinkShort } = require('../../config.json');


module.exports = { 
    name: 'invite',
    helpName: 'Invite',
    category: 'Miscellaneous',
    aliases: ['invite-link'],
    usage: 'invite',
    description: 'Sends a link to invite the bot to the server',

    run: async (bot, message, args) => {
        console.log(`Invite Command used by ${message.member.user.tag}`);
        message.channel.send(`**Use this link to invite me to your server:**\n${inviteLinkShort}`);
    }
};