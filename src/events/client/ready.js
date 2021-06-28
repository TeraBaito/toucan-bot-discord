const Bot = require('../../../index');
const chalk = require('chalk');

/**
 * `ready` event.
 * Triggers once the bot loads all the other events and goes online.
 * Useful to show ready messages and do/set things at startup.
 * 
 * @param {Bot} bot 
 */
module.exports = bot => {
    bot.user.setActivity('with the other birds', { type: 'PLAYING' });
    console.info(`${chalk.green('[Info]')} - ${bot.user.username} online!`);
};