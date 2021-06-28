const { Message, MessageEmbed } = require('discord.js');
const { promptMessage } = require('../../handlers/functions.js');

const chooseArr = ['⛰', '🧻', '✂'];

module.exports = {
    name: 'rps',
    aliases: ['rock-paper-scissors'],
    usage: 'rps',
    description: 'Play Rock Paper Scissors with the bot because idk it\'s fun?',

    /**
     * @param {Bot} bot 
     * @param {Message} message 
     * @param {string[]} args 
     */
    run: async(bot, message, args) => {
        const embed = new MessageEmbed()
            .setColor('#228b22')
            .setFooter(message.guild.me.displayName)
            .setDescription('React to one of these 3 emotes to play')
            .setFooter('You have 30 seconds to react')
            .setTimestamp();

        function getResult(me, them) {
            if((me === '⛰' && them === '✂') ||
            (me === '✂' && them === '🧻') ||
            (me === '🧻' && them === '⛰')) {
                return 'aww, you won :c';
            } else if (me === them) {
                return 'It\'s a tie, gg bro';
            } else {
                return 'I win!';
            }
        }
        
        const m = await message.channel.send(embed);
        const reacted = await promptMessage(m, message.author, 30, chooseArr);
        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];
        const result = getResult(reacted, botChoice);
        
        embed
            .setDescription('')
            .addField(result, `${reacted} **vs** ${botChoice}`);

        m.edit(embed);

        await m.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
    }
};