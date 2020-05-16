// modules
const Discord = require('discord.js');
const { config } = require('dotenv');
const bot = new Discord.Client(); 
const fs = require('fs');



bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.categories = fs.readdirSync('./commands/');

["command"].forEach(handler => {
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


// --- finally, goddamnit, the commands ---
bot.on('message', async message => {
    const prefix = process.env.PREFIX;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
 

       
    /* ";config prefix ?" in which:
    ; = prefix
    config = cmd
    prefix,? = args (args[0],args[1])  */

    //command reading
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    if (cmd.length === 0) return;    


    let command = bot.commands.get(cmd);
    if(!command) command = bot.commands.get(bot.aliases.get(cmd));

    if(command) command.run(bot, message, args);
});