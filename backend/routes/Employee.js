//Imports
const express = require('express');
const router = express.Router();
//Controller import
const {getEmployees, getEmployee, getEmployeesOfUser, addEmployee} = require('../controllers/Employee');

//middleware
const {protect} = require('../middleware/authMiddleware');

//Routes
router.get('/', protect, getEmployees);
router.get('/:id', protect, getEmployee);
router.get('/user/:id', protect, getEmployeesOfUser);
router.post('/add', protect, addEmployee);

//Exports
module.exports = router;

