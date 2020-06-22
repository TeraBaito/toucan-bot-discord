const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const { randomizePercentage } = require('../../handlers/functions.js');

module.exports = {
    name: 'ship',
    helpName: 'Ship',
    category: 'Fun',
    // aliases: [],
    cooldown: 10,
    usage: 'ship [character1] | [character2]',
    description: 'Show the percentage of how good a ship is for all those MHA shippers out there 😳',

    run: async(bot, message, args) => {
        let shipRegex = new RegExp('.* \| .*');
        let toShip = args.join(' ').split(/ \| /);
        let [char1, char2] = [toShip[0], toShip[1]];

        function giveResults() {
            const num = Math.floor(randomizePercentage(100));

            if (num >= 0 && num < 10) return `${num}% Horrendous 🐒`;
            else if (num >= 10 && num < 20) return `**${num}%** Awful 🤮`;
            else if (num >= 20 && num < 30) return `**${num}%** Bad 🤢`;
            else if (num >= 30 && num < 40) return `**${num}%** Worse than average 😑`;
            else if (num >= 40 && num < 50) return `**${num}%** Average 😐`;
            else if (num >= 50 && num < 60) return `**${num}%** Better than average 🙂`;
            else if (num >= 60 && num < 70) return `**${num}%** Good 😀`;
            else if (num >= 70 && num < 80) return `**${num}%** Great! 😁`;
            else if (num >= 80 && num < 90) return `**${num}%** Awesome! 🥰`;
            else if (num >= 90) return `**${num}**% Perfect!! 😍`;
        }

        let sEmbed = new Discord.MessageEmbed()
            .setColor('#dc143c')
            .setDescription(stripIndents`💞**Shipping**💞
            🔻 \`${char1}\`
            🔺 \`${char2}\`
            
            ${giveResults()}`);

        message.channel.send(sEmbed);
    }
};