// models/ITCaseStudiesModel.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/mysql/db');
const { generateId } = require('../utils/utils'); // Import the generateId function
const Image = require('./ImageModel');
/**
 *  model class for it case studies
 * @author Vishal kumar
 * @since 10 jul 2024
 * 
 */
class ITCaseStudiesModel extends Model {}

ITCaseStudiesModel.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: () => generateId('it_case_studies') // Use generateId from utils
    },
    heading: {
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
    bannner_image_id: {
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
    modelName: 'ITCaseStudiesModel',
    tableName: 'it_case_studies',
    timestamps: false // Disable automatic timestamps
});

ITCaseStudiesModel.belongsTo(Image, { foreignKey: 'bannner_image_id' });

module.exports = ITCaseStudiesModel;