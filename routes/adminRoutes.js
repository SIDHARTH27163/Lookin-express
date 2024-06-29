// routes/adminRoutes.js
const express = require('express');
const AdminController = require('../controllers/adminController');
const router = express.Router();
const adminController = new AdminController();

router.post('/create', (req, res) => adminController.createAdmin(req, res));
router.post('/admin_login', (req, res) => adminController.login(req, res));
router.get('/getusers' , (req, res)=>adminController.users(req, res));
module.exports = router;
