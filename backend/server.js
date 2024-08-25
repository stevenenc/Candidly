// Import necessary packages and modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Import the User model
const authMiddleware = require('./middlewares/auth');
// const {
//   registerValidationRules,
//   validate,
// } = require('./validators/authValidators');
require('dotenv').config(); // Load environment variables from .env file

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// CORS options to allow requests from specific origins
var corsOptions = {
  origin: 'http://localhost:8081',
};

// Middleware setup
app.use(cors(corsOptions));
app.use(express.json()); // Parse requests with content-type - application/json
app.use(express.urlencoded({extended: true})); // Parse requests with content-type - application/x-www-form-urlencoded

// Session middleware to handle cookie-based sessions
app.use(
  cookieSession({
    name: 'candidly-session',
    keys: [process.env.JWT_SECRET], // Use JWT secret as the cookie session key
    httpOnly: true, // Ensure cookies are accessible only by the web server
  }),
);

// Route for user registration
app.post('/register', async (req, res) => {
  try {
    const {username, email, password} = req.body; // Extract data from request body
    console.log('Registering user:', {username, email, password});

    // Check if the user already exists
    const existingUser = await User.findOne({username});
    if (existingUser) {
      return res.status(400).send({message: 'Username already in use'});
    }

    // Check if the email already exists
    const existingEmail = await User.findOne({email});
    if (existingEmail) {
      return res.status(400).send({message: 'Email already in use'});
    }

    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hashed password:', hashedPassword);

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Send success response
    res.send({message: 'User registered successfully'});
  } catch (err) {
    console.error('Error during registration:', err);
    // Handle errors and send error response
    res.status(500).send({message: 'Internal server error'});
  }
});

// Route for user login
app.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body; // Extract data from request body

    console.log('Email:', email);
    console.log('Password:', password);

    // Find the user by email
    const user = await User.findOne({email});
    if (!user) {
      console.log('User not found');
      return res.status(400).send({message: 'Invalid email or password'});
    }

    console.log('User found:', user);
    console.log('Comparing passwords:');
    console.log('Plain password:', password);
    console.log('Hashed password:', user.password);

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Is password valid:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(400).send({message: 'Invalid password'});
    }

    // Generate a JWT token
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    // Send the token back to the client
    res.status(200).send({token});
  } catch (err) {
    // Handle errors and send error response
    res.status(500).send({message: 'Internal server error'});
  }
});

// Basic route to test the server
app.get('/', (req, res) => {
  res.send('Candidly Backend');
});

// Route to set a session variable
app.get('/set-session', (req, res) => {
  req.session.user = 'testUser';
  res.send("Session variable 'user' set.");
});

// Route to get the session variable
app.get('/get-session', (req, res) => {
  res.send(`Session variable 'user' is: ${req.session.user}`);
});

// Protected route
app.get('/protected-route', authMiddleware, (req, res) => {
  res.send('This is a protected route');
});

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB database connection established successfully');
  })
  .catch(err => {
    console.log(err);
    process.exit();
  });

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
