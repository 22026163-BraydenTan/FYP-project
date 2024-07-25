const express = require('express');
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');

// MongoDB connection details
const uri = 'mongodb://fypprojectwebapp-server:tSNFCKbAvOnyJdIrXkYsQSIkuik8M3VRnUjDmftyWCZjKRrgrXuvSPsWK7OjxQ0qVFeZK2FFXEJtACDb2508Og==@fypprojectwebapp-server.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@fypprojectwebapp-server@';
const dbName = 'FYPassigmenr';

// Express app setup
const app = express();

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

// Serve the homepage
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/homepage.html'));
});

// Start server
const PORT = process.env.PORT || 3000;  // Use the PORT environment variable if available
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export functions and app
module.exports = {
  connectToDatabase,
  getUsersCollection,
  app,
};
