const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authController')
// const protect  = require('../middlewares/authMiddleware');


// Authentification
router.post('/register', authControllers.register);
router.post('/login', authControllers.login);
// Routes proté

module.exports = router;
