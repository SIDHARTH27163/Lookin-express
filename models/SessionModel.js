// models/Session.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql/db');

const Session = sequelize.define('Session', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sessionId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    loginTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Session;
