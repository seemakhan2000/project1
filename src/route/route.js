const express = require('express');
const router = express.Router();
const formController = require('../controller/controller.js');


router.post('/', formController.createData);

router.get('/get', formController.getData);

router.delete('/delete/:id', formController.deleteData);

router.put('/update/:id', formController.updateData);

// login 
router.post('/login', formController.loginUser);

//registration route
router.post('/register', formController.registerUser);

/* exporting the router object so it can be used in other parts of your application.*/
module.exports = router;
