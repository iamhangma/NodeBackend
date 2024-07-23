const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    createpassword: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

const Users = mongoose.model('users', userSchema);
module.exports = Users;
