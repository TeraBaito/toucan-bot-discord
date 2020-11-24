const Discord = require('discord.js'),
    { prefix } = require('../../config.json'),
    { blacklistProcess } = require('../../handlers/functions');

/**
 * `message` event.
 * 
 * Triggers each time any user sends any message in any channel the bot can look into.
 * 
 * This event will include things to do whenever a command is triggered, a blacklisted word is said, etc.
 * 
 * Honestly mostly everything that has to do with user input goes here.
 * 
 * @param {Discord.Client} bot The bot as a Client object
 * @param {Discord.Message} message The Message object passed with the `message` event.
 */
module.exports = async(bot, message) => {
    const cooldowns = bot.cooldowns;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    /* "\config prefix ?" in which:
    \ = prefix
    config = cmd
    prefix,? = args (args[0],args[1]) */

    let allowedServers = ['219942726076989440', '711301984887636080', '601434467072212993'];
    

    /*if (message.channel.type === 'news') {
        message.crosspost()
            .catch(console.error);
    }*/

    blacklistProcess(message);


    // Command reading
    if (message.author.bot) return; // Prevent from command loops or maymays from bot answers
    if (!message.guild) return; // No DMs n stuff
    if (!allowedServers.includes(message.guild.id)) return; 
    if (!message.member) message.member = await message.guild.members.fetch(message);
    if (cmd.length === 0) return; // Come on

    // Cooldowns / Command handler
    let command = bot.commands.get(cmd);
    if(!command) command = bot.commands.get(bot.aliases.get(cmd));

    try {
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }
    } catch (e) {
        if (e instanceof TypeError) {
            return;
        } else {
            return console.error(e);
        }
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown ? command.cooldown : 3) * 1000;
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (timestamps.has(message.author.id)) {
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send(`It's cool you're trying to do stuff but could you chill a bit for ${timeLeft.toFixed(1)} seconds?`);
        }
    } else {
        if(command && message.content.startsWith(prefix)) command.run(bot, message, args);
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
    
    
};