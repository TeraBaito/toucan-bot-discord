const Discord = require('discord.js');

module.exports = {
    name: 'unban',
    helpName: 'Unban',
    category: 'Moderation',
    // aliases: [],
    usage: 'unban [ID]',
    description: 'Unbans a member from the current guild',

    run: async(bot, message, args) => {
        const logChannel = message.guild.channels.cache.find(c => c.name === 'toucan-logs') || message.channel;
        let reason = args.slice(1).join(' ')

        if(message.deletable) message.delete();

        // Checks of when using command
        
        // No args
        if (!args[0]) {
            return message.reply('Please provide a user to unban').then(m => m.delete({timeout: 5000}));
        }

      

       

        // No permissions to unban
        if (!message.member.hasPermission('BAN_MEMBERS', 'ADMINISTRATOR')) {
            return message.reply('You don\'t have permissions to unban members so...').then(m => m.delete({timeout: 5000}));
        }

        // No bot permissions to ban (it does by default)
        if (!message.guild.me.hasPermission('BAN_MEMBERS', 'ADMINISTRATOR')) {
            return message.reply('I don\'t have permissions to unban members, please enable them').then(m => m.delete({timeout: 5000}));
        }

        

        // No member found
        
        // Finding Nemo, I mean the banned user
        let toUnban;
        try {
            toUnban = await bot.users.fetch(args[0]);
        } catch(e) {
            message.channel.send('Couldn\'t find member').then(m => m.delete({timeout: 5000}));
            return;
        }

        // why are you unbanning yourself
        if (message.author.id === toUnban.id) {
            return message.reply('But you typed this command, so you aren\'t banned??');
        }
        
        try {
            message.guild.members.unban(toUnban, { reason });
            message.channel.send(`**${toUnban.tag}** has been unbanned from the guild.`);
        } catch(e) {
            console.log(e)
        }
     
        // Log
        
        const ubEmbed = new Discord.MessageEmbed()
            .setColor('#228b22')
            .setFooter(message.member.displayName)
            .setTimestamp()
            .setDescription('**Unban Action**')
            .addField('Unanned member', `${toUnban} (${toUnban.id})`)
            .addField('Banned by', `${message.author} (${message.author.id})`)

            // Add field if reason or if not reason
            if (!args[1]) {
                ubEmbed.addField('Reason', 'No reason specified');
            } else {
                ubEmbed.addField('Reason', reason);
            }
            
        logChannel.send(ubEmbed)
    }
}