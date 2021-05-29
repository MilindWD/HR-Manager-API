//Imports
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const {generateToken} = require('../utils/generateToken');


//@desc Auth user and get JWT   
//@route POST api/users/login  
//@access Public  
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body; 
    const user = await User.findOne({email});
    if(user&&(await user.matchPassword(password))) {
        res.json({
            _id: user._id, 
            name: user.name,   
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)  
        })
    } else {
        res.status(401) 
        throw new Error('Invalid e-mail/password');
    }
});

//@desc View User Profile 
//@route GET api/users/profile 
//@access User
const getUserProfile = asyncHandler(async (req, res) => {
    const user = req.user;  
    if(user) {
        res.json({
            _id: user._id, 
            name: user.name,   
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404).json({
            error: "user Not found"
        })
    }
});

module.exports = {authUser, getUserProfile};