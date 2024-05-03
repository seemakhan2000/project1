const mongoose = require('mongoose');
// Registration Schema
const adminSchema = new mongoose.Schema({
   name: {
        type: String,
        required: true,
        trim: true
    },
   email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
   password: {
        type: String,
        required: true
    }
});

const teacher = mongoose.model('teacher', adminSchema);

module.exports =  teacher; 

