const Discord = require('discord.js');
const { randomizePercentage } = require('../../handlers/functions.js');
const { stripIndents } = require('common-tags');

module.exports = {
    name: 'chat-reviver',
    helpName: 'Chat Reviver',
    category: 'Fun',
    aliases: ['revive-chat', 'chat-revive', 'reviver', 'chat-respawner', 'chat-respawn', 'respawn-chat'],
    // cooldown: ,
    usage: 'chat-reviver (request [request text])', // move (bot owner only) with the request text to move from request array to approved array; list (bot owner only too) to see the list
    description: 'Revives a chat with cool ideas to talk of! Use the argument `request` to request more content for the reviver!',

    // putting it here so arrays don't reset because they gay
    approvedArray: [],
    requestsArray: [],

    run: async function(bot, message, args) {

        // Embed
        const crEmbed = new Discord.MessageEmbed()
            .setColor('22b722')
            .setDescription(stripIndents`**Chat Reviver**
            ${this.approvedArray[Math.floor(randomizePercentage(this.approvedArray.length))]}`);

        // Normal function
        if (!args[0]) {
            message.channel.send(crEmbed);
        }

        // Request args
        if (args[0] === 'request') {

            if (args[1].length <= 3) {
                return message.channel.send('Please make it a bit more complete, if you could! At least more than 3 charaters')
                    .then(m => m.delete({timeout: 5000}));
            } else {
                const requestElem = args.slice(1).join(' ');
                this.requestsArray.push(requestElem);
                message.channel.send(`Succesfully requested **${requestElem}** for the reviver!`);

            }

        // Move args (bot owner only)
        } else if (args[0] === 'move') {
            if (!message.author.id === '558264504736153600') {
                return message.channel.send('You\'re not the owner of this bot so you cannot move requests get dunked');
            }

            if (!this.requestsArray.find(elem => elem.toLowerCase() === args.slice(1).join(' ') || elem === args.slice(1).join(' '))) return message.channel.send('Master, that entry doesn\'t exist!');

            const approvedNum = this.requestsArray.indexOf(args[1]);
            const approvedElement = this.requestsArray.splice(approvedNum, 1);

            this.approvedArray.push(approvedElement.join(' '));
            message.channel.send(`Successfully moved **${approvedElement}** to the approved section!`);

        // Reset args (bot owner only)
        } else if (args[0] === 'reset') {
            if (!message.author.id === '558264504736153600') {
                return message.channel.send('You\'re not the owner of this bot so you cannot delete the entries haha');
            }

            if (args[1] === 'requests') {
                this.requestsArray.splice(0, this.requestsArray.length);
                message.channel.send('Deleted all the requests');
                console.log('Requests deleted');
            } else if (args[1] === 'approved') {
                this.approvedArray.splice(0, this.approvedArray.length);
                message.channel.send('Deleted all the approved elements');
                console.log('Appoved elements deleted');
            }

        // List args (needs Manage Server perm)
        } else if (args[0] === 'list') {
            if (!message.member.hasPermission('MANAGE_SERVER')) return message.channel.send('You don\'t have enough permissions to do this!');

            const getResults = array => {
                if (array.length === 0) return 'None'; 
                else return array.join('\n');
            };

            message.channel.send(stripIndents`**·Approved answers:**
            ${getResults(this.approvedArray)}
            
            **·Pending Requests:**
            ${getResults(this.requestsArray)}`);

        // Delete args (bot owner only)
        } else if (args[0] === 'delete') {
            if (!message.author.id === '558264504736153600') {
                return message.channel.send('You\'re not the owner of this bot so you cannot delete elements get dunked');
            }

            const requestedNum = this.requestsArray.indexOf(args[2]);
            const approvedNum = this.approvedArray.indexOf(args[2]);

            if (args[1] === 'request') {
                if (!this.requestsArray.find(elem => elem.toLowerCase() == args.slice(2).join(' ') || elem == args.slice(2).join(' '))) return message.channel.send('Master, that entry doesn\'t exist!');

                const requestedElem = this.requestsArray.splice(requestedNum, 1);
                message.channel.send(`**${requestedElem}** has been deleted from the requests array`);
            } else if (args[1] === 'approved') {
                if(!this.approvedArray.find(elem => elem.toLowerCase() == args.slice(2).join(' ') || elem == args.slice(2).join(' '))) return message.channel.send('Master, that entry doesn\'t exist!');

                const approvedElem = this.approvedArray.splice(approvedNum, 1);
                message.channel.send(`**${approvedElem}** has been deleted from the approved array`);
            }
        }
    }

};