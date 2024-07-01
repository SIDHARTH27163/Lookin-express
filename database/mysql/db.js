// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('lookin', 'root', 'Sidharth@123', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

// Test the connection
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Database connection error:', err));

module.exports = sequelize;
