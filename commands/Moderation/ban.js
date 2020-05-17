const Discord = require('discord.js');
const { promptMessage } = require('../../functions.js')

module.exports = {
    name: 'ban',
    helpName: 'Ban',
    category: 'Moderation',
    aliases: ['b'],
    usage: ';ban [@user]',
    description: 'Bans a member from the current guild',

    run: async(bot, message, args) => {
        const logChannel = message.guild.channels.cache.find(c => c.name === 'toucan-logs') || message.channel;

        if(message.deletable) message.delete();

        // Checks of when using command
        
        // No args
        if (!args[0]) {
            return message.reply('Please provide a user to ban').then(m => m.delete({timeout: 5000}));
        }

        

        // No permissions to ban
        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.reply('You don\'t have permissions to kick members, smh').then(m => m.delete({timeout: 5000}));
        }

        // No bot permissions to ban (it does by default)
        if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
            return message.reply('I don\'t have permissions to kick members, please enable them').then(m => m.delete({timeout: 5000}));
        }

        const toBan = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        // No member found
        if (!toBan) {
            return message.reply('Couldn\'t find that member, try again').then(m => m.delete({timeout: 5000}));
        }

        // Can't ban yourself (BRUH moment)
        if (message.author.id === toBan.id) {
            return message.reply('You can\'t ban yourself, what the actual FUCK are you doing???');
        }

        // User not bannable
        if (!toBan.bannable) {
            return message.reply('I can\'t kick that user due to role hierarchy, I guess').then(m => m.delete({timeout: 5000}));
        }
        
        
     

        const bEmbed = new Discord.MessageEmbed()
            .setColor('#eb8334')
            .setThumbnail(toBan.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .addField('Banned member', `${toBan} (${toBan.id})`)
            .addField('Banned by', `${message.author} (${message.author.id})`)

            // Add field if reason or if not reason
            if (!args[1]) {
                bEmbed.addField('Reason', 'No reason specified');
            } else {
                bEmbed.addField('Reason', args.slice(1).join(' '));
            }
            

        const promptEmbed = new Discord.MessageEmbed()
            .setColor('eb8334')
            .setFooter('This verification becomes invalid after 30 seconds')
            .setDescription(`Do you want to kick ${toBan}?`);

        

        message.channel.send(promptEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 30, ['✅', '❌']);
            
            if (emoji === '✅') {
                msg.delete();

                toBan.ban(args.slice(1).join(' '))
                    .catch(err => {
                        if(error) return message.channel.send('Well... something went wrong');
                    });
                
                logChannel.send(bEmbed);
            } else if (emoji === '❌') {
                msg.delete();
                message.reply('Ban cancelled.');
            }
        });
    }
}