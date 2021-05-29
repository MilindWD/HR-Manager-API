//Imports
const express = require('express');
const router = express.Router();
//Controller import
const {authUser, getUserProfile} = require('../controllers/User');
//Middlewares
const {protect} = require('../middleware/authMiddleware');

//Routes  
router.post('/login', authUser);

//Exports
module.exports = router;