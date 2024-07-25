const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { connectToDatabase, getUsersCollection } = require('./database/databases');
const morgan = require('morgan');
const fs = require('fs');
const saltRounds = 10;

const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Add this line to parse JSON bodies

// Logging middleware
const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: logStream }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});

// Route to serve the project description
app.get('/projectdescription', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'project_description.html'));
});

// Route to serve the carbon calculator
app.get('/carboncalculator', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'carbon_calculator.html'));
});

// Route to serve the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Route to serve the register page
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Handle login form submission
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Login attempt:', username);
        const usersCollection = getUsersCollection();
        const user = await usersCollection.findOne({ username });
        if (user) {
            console.log('User found:', user);
            if (bcrypt.compareSync(password, user.password)) {
                res.json({ success: true });
            } else {
                res.json({ success: false, message: 'Invalid username or password' });
            }
        } else {
            res.json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Handle registration form submission
app.post('/register', async (req, res) => {
    try {
        const { username, email, password, confirm_password } = req.body;
        if (password !== confirm_password) {
            return res.json({ success: false, message: 'Passwords do not match' });
        }
        const usersCollection = getUsersCollection();
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const newUser = { username, email, password: hashedPassword };
        await usersCollection.insertOne(newUser);
        res.redirect('/login');
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Start the server and connect to the database
const startServer = async () => {
    try {
        await connectToDatabase();
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1); // Exit the process with an error code
    }
};


startServer();
