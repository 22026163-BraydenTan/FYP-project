const express = require('express'); // Import Express framework
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction
const bodyParser = require('body-parser'); // Import Body-Parser to parse request bodies
const path = require('path'); // Import Path for file path handling
const bcrypt = require('bcrypt'); // Import Bcrypt for password hashing

// MongoDB connection details
const uri = 'mongodb://fypprojectwebapp-server:tSNFCKbAvOnyJdIrXkYsQSIkuik8M3VRnUjDmftyWCZjKRrgrXuvSPsWK7OjxQ0qVFeZK2FFXEJtACDb2508Og==@fypprojectwebapp-server.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@fypprojectwebapp-server@'; // Connection string for MongoDB
const dbName = 'FYPassigmenr'; // Database name
const saltRounds = 10; // Number of salt rounds for password hashing

// Express app setup
const app = express(); // Create an instance of Express
app.use(bodyParser.json()); // Use Body-Parser middleware to parse JSON requests
app.use(express.static(path.join(__dirname, './'))); // Serve static files from the current directory

// MongoDB connection
mongoose.connect(uri, { 
  dbName, 
  useNewUrlParser: true, // Use the new URL parser
  useUnifiedTopology: true // Use the new Server Discover and Monitoring engine
}).then(() => {
  console.log("Connected to MongoDB!"); // Log success message on successful connection
}).catch(err => {
  console.error("Error connecting to MongoDB:", err); // Log error message on connection failure
});

// Define a schema and model for users
const Schema = mongoose.Schema; // Create a new schema
const userSchema = new Schema({
  username: { type: String, unique: true, required: true }, // Username must be unique and required
  email: { type: String, required: true }, // Email must be required
  password: { type: String, required: true } // Password must be required
});
const User = mongoose.model('User', userSchema); // Create a model for the User schema

// Endpoint to check for duplicate usernames
app.post('/check-username', async (req, res) => {
  const { username } = req.body; // Extract username from request body
  try {
    const user = await User.findOne({ username }); // Check if username already exists
    res.json({ exists: !!user }); // Respond with a JSON object indicating whether the username exists
  } catch (err) {
    res.status(500).json({ message: 'Failed to check username', error: err.message }); // Handle errors
  }
});

// Endpoint to handle user registration
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body; // Extract user details from request body

  // Validate email domain
  if (!email.endsWith('@gmail.com')) {
    return res.status(400).json({ message: 'Email must be a @gmail.com address' }); // Respond with error if email domain is incorrect
  }

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' }); // Respond with error if username already exists
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password using bcrypt
    const newUser = await User.create({ username, email, password: hashedPassword }); // Create a new user
    res.status(201).json({ message: 'User registered successfully', user: newUser }); // Respond with success message
  } catch (err) {
    res.status(400).json({ message: 'Failed to register user', error: err.message }); // Handle errors
  }
});

// Endpoint to handle user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body; // Extract user credentials from request body
  try {
    const user = await User.findOne({ username }); // Find user by username
    if (user && await bcrypt.compare(password, user.password)) { // Check if password matches
      res.status(200).json({ message: 'Login successful', user }); // Respond with success message
    } else {
      res.status(401).json({ message: 'Invalid credentials' }); // Respond with error if credentials are invalid
    }
  } catch (err) {
    res.status(400).json({ message: 'Failed to login', error: err.message }); // Handle errors
  }
});

// Serve the homepage
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'homepage.html')); // Serve the homepage file for all routes
});

// Start server
const PORT = process.env.PORT || 3000; // Use environment port or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log the server start message
});