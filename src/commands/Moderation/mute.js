const { Message, MessageEmbed, Permissions: { FLAGS } } = require('discord.js');
const Bot = require('../../../index');
const colors = require('../../../colors.json');
const { getMember } = require('../../handlers/functions');
    

module.exports = {
    name: 'mute',
    aliases: ['m'],
    usage: 'mute [user] (reason)',
    description: 'Mutes a member from the guild for an indefinite amount of time.\n**Attention:** The muterole has to be called "Muted", and the log channel #toucan-logs',
    staffOnly: true,

    /** 
     * @param {Bot} bot 
     * @param {Message} message 
     * @param {string[]} args 
     */
    run: async(bot, message, args) => {
        // No user provided (no arguments)
        if (!args[0]) {
            return message.channel.send('Please provide a valid user to mute')
                .then(m => setTimeout(() => { m.delete(); }, 5000));
        }

        const logChannel = message.guild.channels.cache.find(c => c.name === 'toucan-logs') || message.channel;
        const toMute = getMember(message, args[0]);
        let muterole = message.guild.roles.cache.find(r => r.name === 'Muted');

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

        // Bot doesn't have perms to mute (it does by default)
        if (!message.guild.me.permissions.has(FLAGS.MANAGE_ROLES)) {
            return message.channel.send('I don\'t have permissions to mute users, please enable the "Manage Roles" permission')
                .then(m => setTimeout(() => { m.delete(); }, 5000));
        }
    
        // Can't find member
        if (!toMute) {
            return message.channel.send('Couldn\'t find that member, try again')
                .then(m => setTimeout(() => { m.delete(); }, 5000));
        }

        // Can't mute yourself
        if (message.author.id === toMute.id) {
            return message.channel.send('nOOOO don\'t try to mute yourself you\'re better than this :cri:');
        }

        // Member to mute has permissions to mute
        if (toMute.permissions.has([FLAGS.KICK_MEMBERS, FLAGS.BAN_MEMBERS, FLAGS.MANAGE_ROLES]) && !message.member.permissions.has(FLAGS.ADMINISTRATOR)) {
            return message.channel.send('You can\'t mute a person that can mute you too, don\'t even bother...');
        }

        const mEmbed = new MessageEmbed()
            .setColor(colors.Orange)
            .setThumbnail(toMute.user.displayAvatarURL)
            .setFooter(message.member.displayName)
            .setTimestamp()
            .setDescription('**Mute Action**')
            .addField('Muted member', `${toMute} (${toMute.id})`)
            .addField('Muted by', `${message.author} (${message.author.id})`);

        // Add field if reason or if not reason
        if (!args[1]) {
            mEmbed.addField('Reason', 'No reason specified');
        } else {
            mEmbed.addField('Reason', args.slice(1).join(' '));
        }

        // Mute
        if (toMute.roles.cache.find(r => r.name === 'Muted')) {
            return message.channel.send('This person is already muted')
                .then(m => setTimeout(() => { m.delete(); }, 5000));
        } else {
            toMute.roles.add(muterole.id)
                .catch(err => {
                    if(err) return message.channel.send('Well... something went wrong');
                });
                    
            logChannel.send(mEmbed);
            message.channel.send(`**${toMute}** has been muted.`);
        }
    }
};