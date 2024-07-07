// routes/adminRoutes.js
/**
     * This file is used as entry for routes point as admin for the project 
     * 
     * @author Sidharth Guleria
     * @since 30 June 2024
     *  
     * @returns 
     */
// routes/adminRoutes.js
const express = require('express');
const AdminController = require('../controllers/adminController');
const ITServicesController = require('../controllers/itServicesController');
const CommonDao = require('../dao/commonDao/commonDao');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const adminController = new AdminController();
const itServicesController = new ITServicesController();
const upload = CommonDao.getUploadMiddleware();

router.post('/create', (req, res) => adminController.createAdmin(req, res));
router.post('/admin_login', (req, res) => adminController.login(req, res));
router.post('/admin_logout', authMiddleware, (req, res) => adminController.logout(req, res));
router.get('/getusers', authMiddleware, (req, res) => adminController.users(req, res));
router.post('/add-it-service', upload.single('image'), (req, res) => itServicesController.saveITService(req, res)); // Handle file upload with multer
router.put('/update-it-service', (req, res) => itServicesController.updateitServices(req, res));
router.get('/get-it-service', (req, res) => itServicesController.getAllITServices(req, res));
router.post('/add-case-study', (req, res) => itServicesController.saveCaseStudies(req, res));
router.put('/update-case-study', (req, res) => itServicesController.updateCaseStudies(req, res));
router.get('/get-case-studies', (req, res) => itServicesController.getAllITCaseStudies(req, res));
module.exports = router;
