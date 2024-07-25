const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// MongoDB connection using Mongoose
mongoose.connect('mongodb://fypprojectwebapp-server:tSNFCKbAvOnyJdIrXkYsQSIkuik8M3VRnUjDmftyWCZjKRrgrXuvSPsWK7OjxQ0qVFeZK2FFXEJtACDb2508Og==@fypprojectwebapp-server.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@fypprojectwebapp-server@', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Successfully connected to MongoDB!"))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define a schema and model for users
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Middleware setup
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './')));

// Endpoint to check for duplicate usernames
app.post('/check-username', async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    res.json({ exists: !!user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to check username', error: err.message });
  }
});

// Endpoint to handle user registration
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validate email domain
  if (!email.endsWith('@gmail.com')) {
    return res.status(400).json({ message: 'Email must be a @gmail.com address' });
  }

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = await User.create({ username, email, password });
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(400).json({ message: 'Failed to register user', error: err.message });
  }
});

// Endpoint to handle user login (basic example, not secure)
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Failed to login', error: err.message });
  }
});

// Serve the homepage
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'homepage.html'));
});

// Start server
const PORT = process.env.PORT || 3000;  // Use the PORT environment variable if available
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
