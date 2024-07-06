// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('lookin', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
