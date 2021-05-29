const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    customerName: {
        type: String,
        required: true
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Employee'
    },
    joiningDate: {
        type: String,
        required: true
    },
    closingDate: {
        type: String,
        required: false
    },
    fixedPayment: {
        type: Number,
        required: true 
    },
    totalAmount: {
        type: Number,
        required: true
    },
    totalWorkDays: {
        type: Number,
        required: false
    },
    advanceAmount: {
        type: Number,
        required: true
    },
    balanceAmount: {
        type: Number,
        required: true
    },
    
    payments: [{
        invoiceId: {
            type: Number
        },
        amount: {
            type: Number,
            required: true
        },
        comments: {
            type:String,
            required: false
        },
        date: {
            type: Date,
            required: true
        }
    }]
},{
    timestamps: true
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;