const { Sequelize } = require('sequelize');

const tagsDB = new Sequelize({
    dialect: 'sqlite',
    logging: false,
    storage: 'db/tags.sqlite',
});

module.exports = { tagsDB };