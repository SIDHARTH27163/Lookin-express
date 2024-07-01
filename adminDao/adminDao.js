// dao/AdminDao.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const AdminProfile = require('../models/AdminProfile');


class AdminDao {
    async createAdmin(admin) {
        try {
            // Check if the email already exists
            const existingAdmin = await Admin.findOne({ where: { email: admin.email } });
            if (existingAdmin) {
                return {
                    status: 409, // Conflict status code
                    message: 'User already exists'
                };
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(admin.password, 10);

            // Create the new admin
            const newAdmin = await Admin.create({
                email: admin.email,
                name: admin.name,
                phoneNumber: admin.phoneNumber,
                password: hashedPassword,
                profile_id: admin.profile_id
            });

            return {
                status: 201, // Created status code
                message: 'Admin created successfully', 
                // message 
                adminId: newAdmin.id
            };
        } catch (error) {
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
            const admins = await Admin.findAll({ include: AdminProfile });
            return admins;
        } catch (error) {
            throw new Error('Error getting admins: ' + error.message);
        }
    }
}

module.exports = AdminDao;
