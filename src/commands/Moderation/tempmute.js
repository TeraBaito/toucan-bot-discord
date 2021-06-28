const { Message, MessageEmbed, Permissions: { FLAGS }} = require('discord.js');
const Bot = require('../../../index');
const ms = require('ms');
const colors = require('../../../colors.json');
const { getMember } = require('../../handlers/functions');


module.exports = {
    name: 'tempmute',
    aliases: ['tm'],
    usage: 'tempmute [user] [time {s, m, h, d}] (reason)',
    description: 'Mutes a user from the guild temporarily, for a specified amount of time (seconds, minutes, hours, days)',
    staffOnly: true,

    /** 
     * @param {Bot} bot 
     * @param {Message} message 
     * @param {string[]} args 
     */
    run: async(bot, message, args) => {
        // No user provided (no first argument)
        if (!args[0]) {
            return message.channel.send('Please provide a valid user to tempmute')
                .then(m => setTimeout(() => { m.delete(); }, 5000));
        }

        const logChannel = message.guild.channels.cache.find(c => c.name === 'toucan-logs') || message.channel;
        const toTempmute = getMember(message, args[0]);
        let muterole = message.guild.roles.cache.find(r => r.name === 'Muted');
        let mutetime = args[1];
        let reason = args[2] ? args.slice(2).join(' ') : 'No reason specified';


        // No muterole, creates a muterole :)
        if(!muterole) {
            try {
                muterole = await message.guild.createRole({
                    name: 'Muted',
                    color: '#800000',
                    permissions:[]
                });
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch(e) {
                console.log(e.stack);
                message.channel.send('Well, something went wrong...');
            }
        }

        // Bot doesn't have perms to tempmute (it does by default)
        if (!message.guild.me.permissions.has(FLAGS.MANAGE_ROLES)) {
            return message.channel.send('I don\'t have permissions to tempmute users, please enable the "Manage Roles" permission')
                .then(m => setTimeout(() => { m.delete(); }, 5000));
        }
    
        // No time provided (no second argument)
        if (!mutetime) {
            return message.channel.send('Please provide a valid time argument to tempmute');
        }

        // Can't find member
        if (!toTempmute) {
            return message.channel.send('Couldn\'t find that member, try again')
                .then(m => setTimeout(() => { m.delete(); }, 5000));
        }

        // Can't mute yourself
        if (message.author.id === toTempmute.id) {
            return message.channel.send('nOOOO don\'t try to mute yourself you\'re better than this :cri:');
        }

        // Member to tempmute has permissions to tempmute
        if (toTempmute.permissions.has(FLAGS.KICK_MEMBERS, FLAGS.BAN_MEMBERS, FLAGS.MANAGE_ROLES) && !message.member.permissions.has(FLAGS.ADMINISTRATOR)) {
            return message.channel.send('You can\'t tempmute a person that can tempmute you too, don\'t even bother...');
        }

        const mEmbed = new MessageEmbed()
            .setColor(colors.Orange)
            .setThumbnail(toTempmute.user.displayAvatarURL)
            .setFooter(message.member.displayName)
            .setTimestamp()
            .setDescription('**Temporary Mute Action**')
            .addField('Muted member', `${toTempmute} (${toTempmute.id})`)
            .addField('Muted by', `${message.author} (${message.author.id})`)
            .addField('Mute time', ms(ms(mutetime)))
            .addField('Reason', reason);

        const umEmbed = new MessageEmbed()
            .setColor(colors.ForestGreen)
            .setThumbnail(toTempmute.user.displayAvatarURL)
            .setFooter(message.member.displayName)
            .setTimestamp()
            .setDescription('**Unmute Action**')
            .addField('Unmuted member', `${toTempmute} (${toTempmute.id})`)
            .addField('Reason', 'Automatic unmute');


        if (toTempmute.roles.cache.find(r => r.name === 'Muted')) {
            return message.channel.send('This person is already muted')
                .then(m => setTimeout(() => { m.delete(); }, 5000));
        } else {
            await(toTempmute.roles.add(muterole.id));
            message.channel.send(`${toTempmute} has been muted for ${ms(ms(mutetime))}`)
                .catch(err => {
                    if(err) return message.channel.send('Well... something went wrong');
                });
                    
            logChannel.send(mEmbed);
            

            setTimeout(() => {
                toTempmute.roles.remove(muterole.id);
                logChannel.send(umEmbed);
            }, ms(mutetime));
        }
    }
};