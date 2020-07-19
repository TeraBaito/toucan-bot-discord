// modules
const Discord = require('discord.js');
const { config } = require('dotenv');
const bot = new Discord.Client(); 
const fs = require('fs');
const { isNullOrUndefined } = require('util');


bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.categories = fs.readdirSync('./commands/');


const cooldowns = new Discord.Collection();


// handler folder 
['command'].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});

// env
config ({
    path: `${__dirname}/.gitignore/.env`
});

bot.login(process.env.TOKEN);
let ver = process.env.NODE_ENV;

// turn on bot
bot.on('ready', () => {
    if (ver === 'prod') {
        bot.user.setActivity('out for commands', {type: 'WATCHING'});
    } else if (ver === 'dev') {
        bot.user.setActivity('my owner code terribly', {type: 'WATCHING'});
    }
    console.log(`${bot.user.username} online in ${bot.guilds.cache.size} servers`);
});


// core
bot.on('message', async message => {


    // Prefix
    let prefixes = JSON.parse(fs.readFileSync('./handlers/prefixes.json', 'utf-8'));
    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: process.env.PREFIX
        };
    };

    let prefix = prefixes[message.guild.id].prefixes;

    // Show prefix when mentioned
    const mentionRegex = new RegExp(`^<@!?${bot.user.id}>`);
    if (message.content.match(mentionRegex)) {
        return message.channel.send(`My prefix is \`${prefix}\``);
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

       
    /* ";config prefix ?" in which:
    ; = prefix
    config = cmd
    prefix,? = args (args[0],args[1])  */

    // command reading
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    if (cmd.length === 0) return;    

 
    
  

    // command handler
    let command = bot.commands.get(cmd);
    if(!command) command = bot.commands.get(bot.aliases.get(cmd));



    // cooldowns (default is 3s)
    if (!cooldowns.has(command.name)) {
        try {
            return cooldowns.set(command.name, new Discord.Collection());
        } catch (e) {
            return;
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
        if(command) command.run(bot, message, args);
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
});