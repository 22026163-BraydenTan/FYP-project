const express = require('express');
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

// MongoDB connection details
const uri = 'mongodb://fypprojectwebapp-server:tSNFCKbAvOnyJdIrXkYsQSIkuik8M3VRnUjDmftyWCZjKRrgrXuvSPsWK7OjxQ0qVFeZK2FFXEJtACDb2508Og==@fypprojectwebapp-server.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@fypprojectwebapp-server@';
const dbName = 'FYPassigmenr';
const saltRounds = 10;

// Express app setup
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './')));

// Initialize MongoDB variables
let db;
let usersCollection;

// Function to connect to the database
const connectToDatabase = async () => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    // Connect the client to the server
    await client.connect();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    db = client.db(dbName);

    // Check if the collection exists and create it if it does not
    const collections = await db.collections();
    const collectionNames = collections.map(col => col.collectionName);
    if (!collectionNames.includes('users')) {
      usersCollection = await db.createCollection('users');
      console.log('Users collection created');
    } else {
      usersCollection = db.collection('users');
      console.log('Users collection already exists');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

// Function to get the users collection
const getUsersCollection = () => {
  if (!usersCollection) {
    throw new Error('Users collection is not initialized');
  }
  return usersCollection;
};

// Endpoint to check for duplicate usernames
app.post('/check-username', async (req, res) => {
  const { username } = req.body;
  try {
    const users = await getUsersCollection();
    const user = await users.findOne({ username });
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
    const users = await getUsersCollection();
    
    // Check if username already exists
    const existingUser = await users.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await users.insertOne({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user: newUser.ops[0] });
  } catch (err) {
    res.status(400).json({ message: 'Failed to register user', error: err.message });
  }
});

// Endpoint to handle user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const users = await getUsersCollection();
    const user = await users.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
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

// Connect to the database before starting the server
connectToDatabase().catch(console.error);

// Export functions and app
module.exports = {
  connectToDatabase,
  getUsersCollection,
  app,
};
