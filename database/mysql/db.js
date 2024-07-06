// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('lookin', 'root', 'Sidharth@123', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
