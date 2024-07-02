const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql/db');

const ITservice = sequelize.define('it_services', {
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
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image:{
        type: DataTypes.BLOB,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
     created_by :
     {
        type: DataTypes.INTEGER,
        defaultValue: 0
     },
     updated_by :
     {
        type: DataTypes.INTEGER,
        defaultValue: 0
     }

});
module.exports = ITservice;