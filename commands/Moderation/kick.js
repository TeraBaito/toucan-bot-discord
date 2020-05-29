const Discord = require('discord.js');
const { promptMessage } = require('../../functions.js');

module.exports = {
    name: 'kick',
    helpName: 'Kick',
    category: 'Moderation',
    aliases: ['k'],
    usage: ';kick [{@user, ID}] (reason)',
    description: 'Kicks a member from the current guild\n**Attention:** Log channel has to be called #toucan-logs, or else it will log it in the current channel.',

    run: async(bot, message, args) => {
        const logChannel = message.guild.channels.cache.find(c => c.name === 'toucan-logs') || message.channel;

        // Checks of when using command
        
        if(message.deletable) message.delete();

        // No args
        if (!args[0]) {
            return await message.reply('Please provide a user to kick').then(m => m.delete({timeout: 5000}));
        }

        // No permissions to kick
        if (!message.member.hasPermission('KICK_MEMBERS', 'ADMINISTRATOR')) {
            return await message.reply('You don\'t have permissions to kick members, smh').then(m => m.delete({timeout: 5000}));
        }

        // No bot permissions to kick (it does by default)
        if (!message.guild.me.hasPermission('KICK_MEMBERS', 'ADMINISTRATOR')) {
            return await message.reply('I don\'t have permissions to kick members, please enable them').then(m => m.delete({timeout: 5000}));
        }

        const toKick = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        // No member found
        if (!toKick) {
            return message.reply('Couldn\'t find that member, try again').then(m => m.delete({timeout: 5000}));
        }

        // Can't kick yourself (bruh moment)
        if (message.author.id === toKick.id) {
            return message.reply('You can\'t kick yourself, bruh moment');
        }

        // User not kickable
        if (!toKick.kickable) {
            return message.reply('I can\'t kick that user due to role hierarchy, I guess').then(m => m.delete({timeout: 5000}));
        }
        
        
     

        const kEmbed = new Discord.MessageEmbed()
            .setColor('#eb8334')
            .setThumbnail(toKick.user.displayAvatarURL)
            .setFooter(message.member.displayName)
            .setTimestamp()
            .setDescription('**Kick Action**')
            .addField('Kicked member', `${toKick} (${toKick.id})`)
            .addField('Kicked by', `${message.author} (${message.author.id})`);

        // Add field if reason or if not reason
        if (!args[1]) {
            kEmbed.addField('Reason', 'No reason specified');
        } else {
            kEmbed.addField('Reason', args.slice(1).join(' '));
        }
            

        const promptEmbed = new Discord.MessageEmbed()
            .setColor('eb8334')
            .setFooter('This verification becomes invalid after 30 seconds')
            .setDescription(`Do you want to kick ${toKick}?`);

        

        message.channel.send(promptEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 30, ['✅', '❌']);
            
            if (emoji === '✅') {
                msg.delete();

                toKick.kick(args.slice(1).join(' '))
                    .catch(err => {
                        if(error) return message.channel.send('Well... something went wrong');
                    });
                
                logChannel.send(kEmbed);
                message.channel.send(`**${toKick}** has been kicked.`);

            } else if (emoji === '❌') {
                msg.delete();
                message.reply('Kick cancelled.');
            }
        });
    }
};