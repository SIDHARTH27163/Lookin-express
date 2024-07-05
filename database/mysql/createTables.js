// createTables.js
const sequelize = require('./db');
const User = require('../../models/User');
const UserProfile = require('../../models/UserProfile');

/**
 * This file is used for creating tables in the database 
 * 
 * @author Sidharth Guleria
 * @since 30 June 2024
 *  
 * @returns {Promise<void>}
 */
async function createTables() {
    try {
        // Define the relationship between User and UserProfile
        User.hasOne(UserProfile, { foreignKey: 'user_id' });
        UserProfile.belongsTo(User, { foreignKey: 'user_id' });

        // Sync the models with the database, only create if not exists
        await sequelize.sync({ alter: true });
        console.log('Tables created successfully');
    } catch (error) {
        console.error('Error creating tables:', error.message);
        throw error;
    }
}

module.exports = createTables;
