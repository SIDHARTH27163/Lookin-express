const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql/db');
const AdminProfile = require('./AdminProfile');
/**
     * This file is used for database integration for admin related operations
     * 
     * @author Sidharth Guleria
     * @since 30 June 2024
     *  
     * @returns 
     */
const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    profile_id: {
        type: DataTypes.INTEGER,
        references: {
            model: AdminProfile,
            key: 'id'
        },
        allowNull: true // Allow null to handle cases where profile is not provided
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

Admin.belongsTo(AdminProfile, { foreignKey: 'profile_id' });

module.exports = Admin;
