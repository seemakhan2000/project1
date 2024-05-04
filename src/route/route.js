const express = require('express');
const router = express.Router();
const formController = require('../controller/controller.js');
const { loginUser, registerUser, protectedRoute } = require('../controller/controller.js');
const verifyToken = require('../../middleware/verifyToken.js');

router.post('/', formController.createData);

router.get('/get', formController.getData);

router.delete('/delete/:id',  formController.deleteData);

router.put('/update/:id',  formController.updateData);

router.get('/get',  formController.getData); // Protect this route
// login 
router.post('/login', formController.loginUser);

//registration route
router.post('/signup', formController.registerUser);

// Protected route
router.get('/protected', verifyToken, protectedRoute);


/* exporting the router object so it can be used in other parts of your application.*/
module.exports = router;
