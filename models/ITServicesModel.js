// models/ITServicesModel.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/mysql/db');
const { generateId } = require('../utils/utils'); // Import the generateId function
const Image = require('./ImageModel');

class ITservice extends Model {}

ITservice.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: () => generateId('it_services') // Use generateId from utils
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
    imageId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Image,
            key: 'id'
        }
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
        defaultValue: DataTypes.NOW // Default timestamp value
    }
}, {
    sequelize,
    modelName: 'ITservice',
    tableName: 'it_services',
    timestamps: false // Disable automatic timestamps
});

ITservice.belongsTo(Image, { foreignKey: 'imageId' });

module.exports = ITservice;
