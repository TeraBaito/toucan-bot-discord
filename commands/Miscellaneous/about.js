const Discord = require('discord.js');
const botInfo = require('../../package.json');
const fs = require('fs');

module.exports = { 
    name: 'about',
    helpName: 'About',
    category: 'Miscellaneous',
    aliases: ['bot-info'],
    usage: 'about',
    description: 'General Bot Information',

    run: async (bot, message, args) => {
        let bIcon = bot.user.displayAvatarURL();
        let botEmbed = new Discord.MessageEmbed()
            .setDescription('**Bot Information**')  
            .setColor('#eb8334')
            .setThumbnail(bIcon)
            .addField('Bot Name', bot.user.tag)
            .addField('Made By', process.env.OWNER, `ID: ${process.env.OWNER_ID}`)
            .addField('Creation Date', bot.user.createdAt)
            .setFooter(`Version: ${botInfo.version}, coded with discord.js`);

        return message.channel.send(botEmbed);
    }
};
