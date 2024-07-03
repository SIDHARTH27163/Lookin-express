/**
     * This file is used as entry point for the admin to pass req to dao 
     * 
     * @author Sidharth Guleria
     * @since 25 June 2024
     *  
     * @returns 
     */
// controllers/adminController.js
const AdminDao = require('../adminDao/adminDao');

class AdminController {
    constructor() {
        this.adminDao = new AdminDao();
    }

    async createAdmin(req, res) {
        try {
            const admin = await this.adminDao.createAdmin(req.body);
            res.status(201).json(admin);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        

        try {
            const result = await this.adminDao.loginAdmin(email, password);
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async users(req, res) {
    

        try {
            const result = await this.adminDao.getAllAdmins();
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = AdminController;
