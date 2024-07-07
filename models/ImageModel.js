// models/ImageModel.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/mysql/db');
const { generateId } = require('../utils/utils'); // Import the generateId function

class Image extends Model {}
/**
 * Image model.
 * @author Sidharth Guleria
 * @since 06 jul 2024
 * 
 */
Image.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: () => generateId('images') // Use generateId from utils
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mimetype: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW // Default timestamp value
    }
}, {
    sequelize,
    modelName: 'Image',
    tableName: 'images',
    timestamps: false // Disable automatic timestamps
});

module.exports = Image;
