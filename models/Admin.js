// models/Admin.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql/db');
const AdminProfile = require('./AdminProfile');

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
        }
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
