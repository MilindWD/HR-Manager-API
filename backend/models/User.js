const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    address: {
        type: String
    },
    contact: {
        type: String
    }
}, {
    timestamps: true,
})

userSchema.methods.matchPassword = async function(pass) {
    return await bcrypt.compare(pass, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;