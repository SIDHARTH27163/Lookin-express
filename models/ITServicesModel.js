const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/mysql/db');
const CommonDao = require('../dao/commonDao/commonDao');

/**
 * This file is created by Vishal Kumar
 * 
 * @author Vishal Kumar
 * @since 30 June 2024
 */
class ITservice extends Model {}

ITservice.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: () => CommonDao.generateId('it_services') // Generate custom ID
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
    image: {
        type: DataTypes.BLOB,
        allowNull: false
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: true
    },
    updated_by: {
        type: DataTypes.STRING,
        allowNull: true
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'ITservice',
    tableName: 'it_services',
    timestamps: false
});

module.exports = ITservice;
