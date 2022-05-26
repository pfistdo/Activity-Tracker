require('dotenv').config()
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb"); // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");

// Set up App
const app = express();
app.use(cors()); // Allow all cross-origing requests. More information: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(express.static("public")); // Host all static files in the folder /public
app.use(bodyParser.json()); // Support json encoded bodies
const port = process.env.PORT || "8081"; // Use the PORT variable if set (e.g., when deploying to Heroku)
app.set("port", port);

const server = http.createServer(app);

// Define mongodb connection
const db_user = process.env.DB_USER;
const db_pw = process.env.DB_PW;

// Create URI
const uri =
    "mongodb+srv://" +
    db_user +
    ":" +
    db_pw +
    "@cluster0.epapy.mongodb.net/?retryWrites=true&w=majority";

// Create the client
let database;
const client = new MongoClient(uri);
client.connect((error, db) => {
    if (error || !db) {
        console.log("Could not connect to MongoDB:")
        console.log(error.message);
    }
    else {
        database = db.db('Idea-Tracker');
        console.log("Successfully connected to MongoDB.");
    }
})

//////////////////////////////////////
//// ENDPOINTS ///////////////////////
//////////////////////////////////////

//--------------------------------------------------------------------------------------------------
// Get all categories
//--------------------------------------------------------------------------------------------------
app.get('/api/categories', async (req, res) => {
    try {
        const collection = database.collection('categories');
        const result = await collection.find().toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//--------------------------------------------------------------------------------------------------
// Create a new category
//--------------------------------------------------------------------------------------------------
app.post('/api/categories', async (req, res) => {
    try {
        const collection = database.collection('categories');

        var category = {
            name: req.body.name
        };
        const result = await collection.insertOne(category);

        res.status(201).send({ _id: result.insertedId });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//--------------------------------------------------------------------------------------------------
// Get all ideas
//--------------------------------------------------------------------------------------------------
app.get('/api/ideas', async (req, res) => {
    try {
        const collection = database.collection('ideas');
        const query = {}
        if (req.query.category) {
            query.category = req.query.category
        }
        if (req.query.tags) {
            query.tags = req.query.tags
        }

        // Get all objects that match the query
        const result = await collection.find(query).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//--------------------------------------------------------------------------------------------------
// Create a new category
//--------------------------------------------------------------------------------------------------
app.post('/api/ideas', async (req, res) => {
    try {
        const collection = database.collection('ideas');

        var idea = {
            name: req.body.name,
            category: req.body.category
        };
        const result = await collection.insertOne(idea);

        res.status(201).send({ _id: result.insertedId });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//--------------------------------------------------------------------------------------------------
// Get all tags
//--------------------------------------------------------------------------------------------------
app.get('/api/tags', async (req, res) => {
    try {
        const collection = database.collection('tags');
        const query = {}
        if (req.query.category) {
            query.category = req.query.category
        }

        // Get all objects that match the query
        const result = await collection.find(query).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

// Start the server
server.listen(port, () => console.log("app listening on port " + port));