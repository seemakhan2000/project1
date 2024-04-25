const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For token generation
const {student,admin,user } = require('../../models/schema.js');
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
    // It's a destructuring assignment to extract email and password directly from req.body
     const { email, password } = req.body;
     console.log("Request Body:", req.body);
    // const email = req.body.email;
    // const password = req.body.password;
    console.log("Received email:", email);
    console.log("Received password:", password);
    
    try{

      // Find user by email
       const user = await admin.find({ email:email});
       
        console.log('user from server',user)
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
       // Verify password
       const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);  // Compare provided password with hashedPassword

       if (!isPasswordValid) {
           return res.status(400).json({ message: 'Invalid password' });
       }
  
      
      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        secretKey,
        { expiresIn: '1h' }  // Optional: token expiration time
    );
      res.status(200).json({ token, userId: user.id, email: user.email });
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };






  //registration form
  exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await user.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);  // Hash password with bcrypt

        // Create new user with hashed password
        const newUser = new admin({
            name: name,
            email: email,
            hashedPassword: hashedPassword  // Set hashed password
        });

        // Save user to database
        await newUser.save();

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};