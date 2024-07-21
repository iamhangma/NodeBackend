const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName :{
        type: String,
        required: true,
    }, 
    lastName:{
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },

    email:{
        type: String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    isAdmin :{
        type : Boolean,
        default: false,
    }
})

const Users = mongoose.model('users', userSchema);
module.exports = Users;