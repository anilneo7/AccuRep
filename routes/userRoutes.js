const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.get('/', (req, res) => res.render('index')); // Landing page
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

module.exports = router;
