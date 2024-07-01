const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql/db');

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
