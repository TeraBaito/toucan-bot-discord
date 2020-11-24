const winston = require('winston');
const chalk = require('chalk');

module.exports = {
    logInfo: message => {
        const logger = winston.createLogger({
            transports: new winston.transports.Console(),
            format: winston.format.combine(
                winston.format.colorize({ level: true }),
                winston.format.printf(log => `[${log.level}] - ${log.message}`)
            )
        });
        return logger.info(message);
    },
    logError: error => {
        const errorsFormat = winston.format.combine(
            winston.format.colorize(),
            winston.format.errors(error, { stack: true }),
            winston.format.printf(log => `[${log.level}] - ${log}`)
        );
        const info = errorsFormat.transform(new Error('test'));
        // const info = errorsFormat.transform(error);

        /*const logger = winston.createLogger({
            transports: new winston.transports.Console(),
            format: winston.format.combine(
                winston.format.colorize({ level: true }),
                winston.format.printf(log => `[${log.level}] - ${log}`),
                winston.format.errors({ stack: true })
            )
        });
        const info = winston.format.trans
        return logger.error(error);*/
        return console.error(info);
    },
    logDebug: debug => {
        const logger = winston.createLogger({
            transports: new winston.transports.Console(),
            format: winston.format.combine(
                winston.format.colorize({ level: true }),
                winston.format.printf(log => `[${log.level}] - ${log.message}`)
            )
        });
        return logger.debug(debug);
    },
    logWarn: warn => {
        const logger = winston.createLogger({
            transports: new winston.transports.Console(),
            format: winston.format.combine(
                winston.format.colorize({ level: true }),
                winston.format.printf(log => `[${log.level}] - ${log.message}`)
            )
        });
        return logger.warn(warn);
    }
};
module.exports = function(level, message) {
    let lvl, format;
    switch(level.toLowerCase()) {
    case 'info':
        format = [winston.format.colorize(), winston.format.printf(log => `[${log.level}] - ${log.message}`)];
        lvl = 'info';
        break;
    case 'debug':
        break;
    }
    const logger = winston.createLogger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(log => `[${log.level}] - ${log.message}`)
        ),
        exitOnError: false
    });
    return logger;
};
