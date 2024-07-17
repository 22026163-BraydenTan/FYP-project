const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model for users
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  password: String
});
const User = mongoose.model('User', userSchema);

// Middleware setup
app.use(bodyParser.json());

// Endpoint to handle user registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await User.create({ username, password });
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

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
