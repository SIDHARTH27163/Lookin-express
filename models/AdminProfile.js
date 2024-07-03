const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql/db');
/**
     * This file mapping done is used as entry point for admin profile for the project 
     * 
     * @author Sidharth Guleria
     * @since 30 June 2024
     *  
     * @returns 
     */
const AdminProfile = sequelize.define('AdminProfile', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    profile_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
});

module.exports = AdminProfile;
