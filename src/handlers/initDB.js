const { blue } = require('chalk');
const { argv: args } = process;
const { tagsDB } = require('./databases');

require('./models/Tags')(tagsDB);


const force = args.includes('--force') || args.includes('-f'),
    val = args[2];

switch (val) {
    case 'tags':
    case 'tag':
    case 't':
        tagsDB.sync({ force }).then(() => {
            console.log(blue('[DB]'), 'Tags synced',  force ? 'and reset' : '');
            tagsDB.close();
        }).catch(console.error);
        break;
}