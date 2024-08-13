const User = require('../Model/user.model');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;

// Function to create a JWT token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};



// User signup function
const signupUser = async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;
        const photo = req.file.path
        const cloudStore = await cloudinary.uploader.upload(req.file.path)
        console.log(username, email, password);

        // Ensure all required fields are provided
        if (!username || !email || !password || !phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate email and password
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Email is not valid' });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: 'Password is not strong enough' });
        }

        // Check if the email already exists
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create a new user document
        const user = new User({
            username,
            email,
            password: hash,
            phone,
            profile:cloudStore.secure_url
            // Assuming you are not using 'photo' in this example
        });

        const result = await user.save();
        const token = createToken(result._id);

        // Send a success response
        res.status(201).json({ user, token });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// User login function
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Ensure all required fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Email is not valid' });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Incorrect email' });
        }

        // Compare the password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: 'Incorrect password' });
        }
        console.log(user)
        const token = createToken(user._id);
        res.status(200).json({  user , token });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { signupUser, loginUser };

// this code is written for the future purpose and will be used in the future purpose
// const image = new Image({
//     publicId: result.public_id,
//     url: result.secure_url,
//     format: result.format,
//     createdAt: result.created_at,
//   });
