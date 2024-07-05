// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
/**
     * This file is used as entry point for the project  as user
     * 
     * @author Sidharth Guleria
     * @since 25 June 2024
     *  
     * @returns 
     */
const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users/:userEmail', userController.getUser);
router.put('/users/:userID', userController.updateUser);
router.delete('/users/:userID', userController.deleteUser);

module.exports = router;
