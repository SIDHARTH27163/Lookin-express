// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('lookin', 'root', 'Welcome@123', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
