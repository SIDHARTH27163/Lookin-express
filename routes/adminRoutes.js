// routes/adminRoutes.js
/**
     * This file is used as entry for routes point as admin for the project 
     * 
     * @author Sidharth Guleria
     * @since 30 June 2024
     *  
     * @returns 
     */
// adminRoutes.js

// routes/adminRoutes.js

// routes/adminRoutes.js

// routes/adminRoutes.js
const express = require('express');
const AdminController = require('../controllers/adminController');
const ITServicesController = require('../controllers/itServicesController');
const CommonDao = require('../dao/commonDao/commonDao');

const router = express.Router();
const adminController = new AdminController();
const itServicesController = new ITServicesController();
const upload = CommonDao.getUploadMiddleware();

router.post('/create', (req, res) => adminController.createAdmin(req, res));
router.post('/admin_login', (req, res) => adminController.login(req, res));
router.get('/getusers', (req, res) => adminController.users(req, res));
/**
 * CommonDao: multer integration Provides fucntionality of uploading images.
 * @author Sidharth Guleria
 * @since 06 jul 2024
 * 
 */
router.post('/add-it-service', upload.single('image'), (req, res) => itServicesController.saveITService(req, res)); // Handle file upload with multer
router.put('/update-it-service', (req, res) => itServicesController.updateitServices(req, res));

module.exports = router;

