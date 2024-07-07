// dao/AdminDao.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../../models/User');
const AdminProfile = require('../../models/UserProfile');
const CommonDao = require('../commonDao/commonDao');
const Session = require('../../models/SessionModel');
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

    async loginAdmin(req, email, password) {
        try {
            const admin = await this.getAdminByEmail(email);
            if (!admin) {
                return { status: 404, message: 'Admin not found' };
            }

            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (!isPasswordValid) {
                return { status: 401, message: 'Invalid password' };
            }

            req.session.adminId = admin.userId;
            req.session.adminEmail = admin.email;

            await Session.create({
                userId: admin.userId,
                sessionId:req.session.id,
                loginTime: new Date()
            });

            return { status: 200, message: 'Login successful', sessionId: req.session.id , userdetails:admin };
        } catch (error) {
            console.log(error);
            throw new Error('Error logging in admin: ' + error.message);
        }
    }
    async logoutAdmin(req) {
        try {
            if (req.session) {
                const sessionId = req.session.id; // Assuming session ID is stored in req.session.id

                req.session.destroy(async err => {
                    if (err) {
                        throw new Error('Error logging out: ' + err.message);
                    }

                    // Delete session details from the session table
                    try {
                        await Session.destroy({ where: { sessionId } });
                    } catch (err) {
                        throw new Error('Error deleting session details: ' + err.message);
                    }
                });

                return { status: 200, message: 'Logout successful' };
            } else {
                return { status: 400, message: 'No active session' };
            }
        } catch (error) {
            console.log(error);
            throw new Error('Error logging out: ' + error.message);
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
