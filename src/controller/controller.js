const bcrypt = require('bcryptjs'); // For password hashing
const student = require('../../models/schema.js');
const teacher = require('../../models/registrationSchema.js')
const user = require('../../models/loginSchema.js')
// Import the jwt module
const jwt = require("jsonwebtoken");
// Load environment variables from .env file
require('dotenv').config();


 exports.createData = async (req, resp) => {
    const formData = req.body;
    const savedFormData = await student.create(formData);
    console.log("Received Form Data:", formData);
    resp.json({ message: 'Welcome to my form' });
};

exports.getData = async (req, resp) => {
    let result = await student.find();
    resp.json(result);
};

exports.deleteData = async (req, resp) => {
    const id = req.params.id;
    const deletedData = await student.findOneAndDelete({ _id: id });
    console.log("Deleted Data:", deletedData);
    resp.json({ message: 'Data deleted successfully' });
};

exports.updateData = async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    let updatedDocument = await student.findByIdAndUpdate(id, updatedData, { new: true });
    res.json({ message: 'Document updated successfully', updatedDocument });
};

//login form
exports.loginUser = async (req, res) => {
  // Destructure email and password directly from req.body
  const { email, password } = req.body;
  console.log("Request Body:", req.body);
  console.log("Received email:", email);
  console.log("Received password:", password);
  
  try {
      // Find user by email
      const user = await teacher.find({ email: email });
      console.log('user from server', user);
      
      // Check if user exists
      if (!user || user.length === 0) {
          return res.status(400).json({ message: 'User not found' });
      }
      
      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user[0].password);
      
      if (!isPasswordValid) {
          return res.status(400).json({ message: 'Invalid password' });
      }
      
        // Generate JWT token
        const token = jwt.sign({ userId: user[0]._id, email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' });

// Send token as response
res.status(200).json({ token });
} catch (error) {
console.error('Error:', error);
res.status(500).json({ message: 'Internal Server Error' });
}
};







  //registration form
  exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    console.log('total data',req.body)
    console.log('Received:', { name, email, password });  // Logging the received data
    try {
      //Check if admin already exists
      const existingAdmin = await teacher.findOne({ email: email });
     console.log('Email being searched:', { email: email });
  console.log('Result of findOne operation:', existingAdmin);
      if (existingAdmin) {
          return res.status(400).json({ message: 'Admin already exists' });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);   // Hash password with bcrypt
     
      // Create new admin with hashed password
      const newTeacher = new teacher({
          name: name,
          email: email,
          password: hashedPassword // Set hashed password
      });
      
      // Save admin to database
      await newTeacher.save();
      
      res.status(201).json({ message: 'signup data successfully' });
    } catch (error) {
      // Log detailed error message
      console.log("Error:", error.message);
      
      // Check if the error is due to bcrypt hashing
      if (error.message.includes('bcrypt')) {
          return res.status(500).json({ message: 'Error hashing password' });
      }
  
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


// Protected route
exports.protectedRoute = (req, res) => {
    res.send('Protected data');
};