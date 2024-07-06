const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql/db');
const User = require('./User');
const { generateId } = require('../utils/utils');
const UserProfile = sequelize.define('UserProfile', {
    profileId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: () => generateId('profile')
    },
    user_id: {
        type: DataTypes.STRING,  // Match the type of userId in User model
        references: {
            model: User,
            key: 'userId'
        },
        allowNull: false  // Typically foreign keys should not allow null
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    interest: {  // Corrected spelling from intrest to interest
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    tags: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    hooks: {
        beforeUpdate: (userProfile) => {
            userProfile.updated_at = new Date();
        }
    }
});

UserProfile.belongsTo(User, { foreignKey: 'user_id' });

module.exports = UserProfile;
