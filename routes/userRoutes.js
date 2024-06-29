// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users/:userEmail', userController.getUser);
router.put('/users/:userID', userController.updateUser);
router.delete('/users/:userID', userController.deleteUser);

module.exports = router;
