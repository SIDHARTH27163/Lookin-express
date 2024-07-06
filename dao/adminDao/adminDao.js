// dao/AdminDao.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../../models/User');
const AdminProfile = require('../../models/UserProfile');
const CommonDao = require('../commonDao/commonDao');
/**
     * This file is used as admin point for the project 
     * 
     * @author Sidharth Guleria
     * @since 30 June 2024
     *  
     * @returns 
     */
class AdminDao {
    async createAdmin(admin) {
        try {
            // Check if the email already exists
            const existingAdmin = await Admin.findOne({ where: { email: admin.email } });
            if (existingAdmin) {
                return {
                    status: 409,
                    message: 'User already exists'
                };
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(admin.password, 10);

            // Create the new admin data object
          
/**
     * provide the insertion opertaion
     * 
     * @author Sidharth Guleria
     * @since 04 Jul 2024
     *  
     * @returns 
     */
            // Save the new admin using CommonDao
            admin.password = await bcrypt.hash(admin.password, 10);

            // Save the new admin using CommonDao
            const newAdmin = await new CommonDao().save(admin, Admin);

            return {
                status: 201,
                message: 'Admin created successfully',
                adminId: newAdmin.userId
            };
        } catch (error) {
            console.log(error);
            throw new Error('Error creating admin: ' + error.message);
        }
    
    
    }

    async getAdminByEmail(email) {
        try {
            const admin = await Admin.findOne({ where: { email }, include: AdminProfile });
            return admin;
        } catch (error) {
            throw new Error('Error getting admin: ' + error.message);
        }
    }

    async loginAdmin(email, password) {
        try {
            const admin = await this.getAdminByEmail(email);
            if (!admin) {
                throw new Error('Admin not found');
            }

            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }

            const token = jwt.sign({ id: admin.id, email: admin.email }, config.secretKEY, { expiresIn: '1h' });
            return token;
        } catch (error) {
            throw new Error('Error logging in admin: ' + error.message);
        }
    }

    async getAllAdmins() {
        try {
            const admins = await Admin.findAll();
            return admins;
        } catch (error) {
            throw new Error('Error getting admins: ' + error.message);
        }
    }
}

module.exports = AdminDao;
