const { Message } = require('discord.js');
const Bot = require('../../../index');
const { inviteLinkShort } = require('../../../config.json');


module.exports = { 
    name: 'invite',
    aliases: ['invite-link'],
    usage: 'invite',
    description: 'Sends a link to invite the bot to the server',

    /**
     * @param {Bot} bot 
     * @param {Message} message 
     * @param {string[]} args 
     */
    run: async (bot, message, args) => {
        console.log(`Invite Command used by ${message.member.user.tag}`);
        message.channel.send(`**Use this link to invite me to your server:**\n<${inviteLinkShort}>`);
    }
};