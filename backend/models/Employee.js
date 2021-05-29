const mongoose = require('mongoose');
const User = require('./User');

const employeeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    fatherName: {
        type: String
    },
    husbandName: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    }, 
    dob: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    caste: {
        type: String
    },
    nationality: {
        type: String,
        required: true,
        default: 'Indian'
    },
    isMarried: {
        type: String,
        default: 'Not Married'
    },
    languages: {
        type: String,
        required: false
    },
    education: {
        type: String
    },
    otherQualification: {
        type: String
    },
    workExperience: {
        type: String,
        required: true,
        default: '0'
    }
}, {
    timestamps: true,
})

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;