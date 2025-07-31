// Vérifiez dans votre fichier de routes (ex: `authRoutes.js`)
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/register', authController.register); 

module.exports = router;

