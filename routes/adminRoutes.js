// routes/adminRoutes.js
const express = require('express');
const AdminController = require('../controllers/adminController');
const ITServicesController = require('../controllers/itServicesController');
const router = express.Router();
const adminController = new AdminController();
const itServicesController = new ITServicesController();

router.post('/create', (req, res) => adminController.createAdmin(req, res));
router.post('/admin_login', (req, res) => adminController.login(req, res));
router.get('/getusers' , (req, res)=>adminController.users(req, res));
router.get('/add-it-service' , (req, res)=>itServicesController.saveITService(req, res));
module.exports = router;
