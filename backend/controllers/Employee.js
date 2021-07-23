//Imports
const asyncHandler = require('express-async-handler');
const Employee = require('../models/Employee');

//@desc Fetch all Employees
//@route GET /api/employees
//@access Admin
const getEmployees = asyncHandler(async (req, res) => {
    try {
        const employees = await Employee.find({}).populate('user',{name: 1});
        res.json(employees);
    } catch (error) {
        console.log(error.message);
        res.status(404);
    }
})

//@desc Fetch one Employees
//@route GET /api/employee/:id 
//@access User
const getEmployee = asyncHandler(async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        res.json(employee);
    } catch (error) {
        console.log(error.message);
        res.status(404).json({message: 'Employee not found'});
    }
})

//@desc Fetch Employees of added by certain user
//@route GET /api/employee/user/:id  
//@access User
const getEmployeesOfUser = asyncHandler(async (req, res) => {
    try {
        const employees = await Employee.find({user: req.params.id}).populate('user',{name: 1});
        res.json(employees);
    } catch (error) {
        console.log(error.message);
        res.status(404).json({message: 'Employee not found'});
    }
})

//@desc add a employee  
//@route POST /api/employee/add
//@access User
const addEmployee = asyncHandler(async (req, res) => {
    try {
        const employee = await Employee.insertMany([req.body]);
        res.json(employee);
    } catch (error) {
        console.log(error.message);
        res.status(404).json({message: 'Employee not found'});
    }
})

//@desc update a employee 
//@rote POST /api/employee/update
//@access User  
const  updateEmployee = asyncHandler(async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body);
        res.json(employee);
    } catch (error) {
        console.log(error.message);
        res.status(404).json({message: 'Employee not found'});
    }
})

module.exports = {getEmployees, getEmployee, getEmployeesOfUser, addEmployee, updateEmployee};

