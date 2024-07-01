const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql/db');

const ITservice = sequelize.define('ITservice', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
});