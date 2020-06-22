const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'prefix',
    helpName: 'Custom Prefix',
    category: 'Configuration & Management',
    aliases: ['set-prefix', 'custom-prefix'],
    // cooldown: ,
    usage: 'prefix [new prefix]',
    description: 'Sets a new custom prefix for the bot',

    run: async(bot, message, args) => {
        if (!message.member.hasPermission('MANAGE_SERVER')) return message.channel.send('You don\'t have permission to set up a new prefix');
        if (!args[0]) return message.channel.send('Please specify a prefix');

        let prefixes = JSON.parse(fs.readFileSync('./handlers/prefixes.json'), 'utf-8');

        prefixes[message.guild.id] = {
            prefixes: args[0]
        };

        fs.writeFile('./handlers/prefixes.json', JSON.stringify(prefixes), err => {
            if(err) console.log(err);
        });

        message.channel.send(`Set prefix to \`${args[0]}\``);
    }
};