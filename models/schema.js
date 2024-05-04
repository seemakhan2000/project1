
//This file defines the Mongoose schema for the form data.
//It specifies the structure of the form data including fields like name, email, phone, and password.
const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        upperCase:true
    },
    
    email:{
        type:String,
        required:true,
        lowerCase:true

    },
    phone:{
    type:Number,
    default:123456789
    },
    password: {
        type: String,
        required: true,
      },
 })
 const Student = mongoose.model('student', studentSchema);

 module.exports =  Student; 




//Overall, this codebase implements a simple CRUD (Create, Read, Update, Delete) application using a 
//frontend built with HTML, Bootstrap, and JavaScript, and a backend built with Node.js, Express.js, 
//and MongoDB. It allows users to add, view, update, and delete form data. 
//The form data is stored in a MongoDB database.
