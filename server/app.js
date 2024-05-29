//import express framework
express = require ('express');
const mongoose = require('mongoose'); // Import Mongoose for database connection


//connecting to MongoDB Atlas
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Jichin:oxnn3Ol9IVbvRqyw@cluster0.9xexrqm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const { MongoClient, ServerApiVersion } = require('mongodb');
//create an instance of express module, the veriable app will be used to  define routes and configure the server.
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));


mongoose.connect('mongodb://localhost:27017/fyp', { useNewUrlParser: true, useUnifiedTopology: true }); // Connect to MongoDB

//routes for crud operations. 
app.get('/', (req, res) => {
    //display a list goals
})

app.post('/', (req, res) => {
    //create a new goal
})

app.put('/:id', (req, res) => {
    //update an existing goal
})

app.delete('/:id', (req, res) => {
    //delete an existing goal
})

//defines the port number which the app will listen for incoming request
const port = 3000;
//start the app and listen on the specified port
app.listen(port, () =>
{
    //callback function that executes once the app is started
    console.log(`Server is running on port http://localhost:${port}`);
});