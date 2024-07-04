const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql/db');

/**
 * This file is used for database integration for user related operations
 * 
 * @author Sidharth Guleria
 * @since 04 Jul 2024
 * 
 * @returns 
 */
const User = sequelize.define('User', {
    /**
     * This is used to define the userId as alphanumeric
     * 
     * @author Sidharth Guleria
     * @since 04 July 2024
     * 
     * @returns 
     */
    userId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
            isAlphanumeric: true
        }
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    profile_type: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    remember_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = User;
