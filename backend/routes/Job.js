//Imports
const express = require('express');
const router = express.Router();

//Controller import
const {addJob, findJobById, findAllJobs, findAllJobsOfUser, closeJobById, makePayment, updateFixedPayment} = require('../controllers/Job');

//middleware
const {protect} = require('../middleware/authMiddleware');

//routes
router.post('/assign', protect, addJob);
router.get('/:id', protect, findJobById);
router.get('/', protect, findAllJobs);
router.get('/user/:id',protect, findAllJobsOfUser);
router.post('/close/:id', protect, closeJobById);
router.post('/payment/:id', protect, makePayment);
router.post('/update/fixedpayment/:id', protect, updateFixedPayment);

module.exports = router;