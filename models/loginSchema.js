const mongoose = require('mongoose');


// Login Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    Password: {
        type: String,
        required: true
    }
});

// 


// Create a model for the login schema
const user = mongoose.model('User', userSchema);

module.exports =  user;
