const Discord = require('discord.js');

module.exports = {
    name: 'dice',
    helpName: 'Dice',
    category: 'Fun',
    aliases: ['roll', 'roll-dice', 'the-favorite-command-of-a-dnd-fan'],
    usage: 'dice (# of sides)',
    description: 'Rolls a dice with a determined amount of sides, default is 6',

    run: async(bot, message, args) => {
        if(!args[0]) {
            message.channel.send(`🎲 Result: ${Math.floor(Math.random() * 6) + 1}`);
        } else {
            message.channel.send(`🎲 Result: ${Math.floor(Math.random() * args[0]) + 1}`);
        }
    }
}