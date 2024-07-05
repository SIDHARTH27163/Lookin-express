const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql/db');
/**
     * This file is created by vishal kumar
     * 
     * @author Vishal kumar
     * @since 30 June 2024
     *  
     * @returns 
     */
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
    created_by:{
        type: DataTypes.BLOB,
        allowNull: true
    },
    updated_by:{
        type: DataTypes.BLOB,
        allowNull: true
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
/**
     * last three feilds updated   by Sid 
     * 
     * @author Sidharth Guleria
     * @since 04 Jul 2024
     *  
     * @returns 
     */
});
module.exports = ITservice;