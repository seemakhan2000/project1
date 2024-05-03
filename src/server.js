/*This line imports the express module, which is a popular web framework for Node.js that helps to build web applications and APIs. */
const express = require('express');
/*This imports body-parser, which is a middleware to handle the HTTP POST request data */
const bodyParser = require('body-parser');
const cors = require('cors');
/*This imports the json middleware directly from the express module. The json middleware parses incoming request bodies with JSON payloads.*/
const { json } = require("express");
const formRoute = require('./route/route.js'); 
const { connectToMongoDB } = require('./db/connectMongoDB.js');
// Import the registerUser function from the route file
const  registerUser  = require('./route/route.js');

//console.log(process.env.JWT_SECRET)

//Create an instance of the express application
const api = express();

api.use(cors());
api.use(json());
api.use(bodyParser.urlencoded({ extended: false }));


//Mount the formRoutes to '/form'
api.use('/form', formRoute);
// Register route
api.use('/signup', registerUser);


// Try connecting to MongoDB
try {
  connectToMongoDB();  // Use the imported function
} catch (error) {
  console.error(`Failed to connect to MongoDB: ${error}`);
  
}

// Start server
const PORT = process.env.PORT || 5000;
//Start the server on port 5000
api.listen(5000, () => {
  console.log('Server is running on port 5000');
});