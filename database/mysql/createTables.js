// createTables.js
const sequelize = require('./db');
const Admin = require('../../models/Admin');
const AdminProfile = require('../../models/AdminProfile');
/**
     * This file is used for creating tables in database 
     * 
     * @author Sidharth Guleria
     * @since 30 June 2024
     *  
     * @returns 
     */
async function createTables() {
    try {
        // Define the relationship between Admin and AdminProfile
        Admin.belongsTo(AdminProfile, { foreignKey: 'profile_id' });
        AdminProfile.hasMany(Admin, { foreignKey: 'profile_id' });

        // Sync the models with the database
        await sequelize.sync({ alter: true });
        console.log('Tables created successfully');
    } catch (error) {
        console.error('Error creating tables:', error.message);
        throw error;
    }
}

module.exports = createTables;
