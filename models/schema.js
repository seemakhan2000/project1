
// //This file defines the Mongoose schema for the form data.
// //It specifies the structure of the form data including fields like name, email, phone, and password.
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// //form Schema
// const studentSchema = new mongoose.Schema({
    
//     name:{
//         type:String,
//         required:true,
//         uperCase:true,
       
//     },
    
//     email:{
//         type:String,
//         required:true,
//         lowerCase:true,
//         trim: true,
//         unique: true, //email is unique
        
       
//     },
//     phone: {
//         type: Number,
//         default: 123456789,
        
//     },
    
//     password: {
//         type: String,
//         required: true,
       
//       },
//        })

//        // User Schema
//        const adminSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         lowercase: true,
//         trim: true,
//         //unique: true,
//     },
//     hashedPassword: {
//         type: String,
//         required: true,
//     },
// });

// // Hash the password before saving it to the database
// userSchema.pre('save', async function(next) {
//     if (this.isModified('hashedPassword')) {
//         this.hashedPassword = await bcrypt.hash(this.hashedPassword, 10); // Using bcrypt to hash the password
//     }
//     next();
// });

// // const student = mongoose.model('Student', studentSchema);
// // const admin = mongoose.model('Admin', adminSchema);

// // module.exports = {
// //     student,
// //     admin,
// // };
 
// // const form = mongoose.model('form',formSchema)
// // module.exports = form

// //registeration schema


// // User Schema for Registration
// // User Schema for Registration
// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         lowercase: true,
//         trim: true,
//         unique: true // Email is unique
//     },
//     hashedPassword: {
//         type: String,
//         required: true
//     },
// });

// // Hash the password before saving it to the database
// userSchema.pre('save', async function(next) {
//     if (this.isModified('hashedPassword')) {
//         this.hashedPassword = await bcrypt.hash(this.hashedPassword, 10); // Using bcrypt to hash the password
//     }
//     next();
// });

// const student = mongoose.model('Student', studentSchema);
//  const admin = mongoose.model('Admin', adminSchema);
//  const user = mongoose.model('User', userSchema);
// module.exports = {
//     student,
//     admin,
//     user,
// };

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User Schema for Registration
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true // Email is unique
    },
    hashedPassword: {
        type: String,
        required: true
    },
});

// Hash the password before saving it to the database
userSchema.pre('save', async function(next) {
    if (this.isModified('hashedPassword')) {
        this.hashedPassword = await bcrypt.hash(this.hashedPassword, 10); // Using bcrypt to hash the password
    }
    next();
});

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        upperCase:true,
    },
    email:{
        type:String,
        required:true,
        lowerCase:true,
        trim: true,
        unique: true,
    },
    phone: {
        type: Number,
        default: 123456789,
    },
    password: {
        type: String,
        required: true,
    },
});

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
});

// Hash the password before saving it to the database
adminSchema.pre('save', async function(next) {
    if (this.isModified('hashedPassword')) {
        this.hashedPassword = await bcrypt.hash(this.hashedPassword, 10); // Using bcrypt to hash the password
    }
    next();
});

const student = mongoose.model('Student', studentSchema);
const admin = mongoose.model('Admin', adminSchema);
const user = mongoose.model('User', userSchema);

module.exports = {
    student,
    admin,
    user,
};






