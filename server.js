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
// Update a category
//--------------------------------------------------------------------------------------------------
app.put('/api/categories/:id', async (req, res) => {

    let id = ObjectId(req.params.id);
    let category = req.body;
    delete category._id; // delete the _id from the object, because the _id cannot be updated

    try {
        const collection = database.collection('categories');
        const query = { _id: id }; // filter by id
        const result = await collection.updateOne(query, { $set: category });

        if (result.matchedCount === 0) {
            let responseBody = {
                status: "No object with id " + id
            }
            res.status(404).send(responseBody);
        }
        else {
            res.send({ status: "Object with id " + id + " has been updated." });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//--------------------------------------------------------------------------------------------------
// Delete a category
//--------------------------------------------------------------------------------------------------
app.delete('/api/categories/:id', async (req, res) => {

    // read the path parameter :id
    let id = req.params.id;

    try {
        const collection = database.collection('categories');
        const query = { _id: ObjectId(id) }; // filter by id
        const result = await collection.deleteOne(query);

        if (result.deletedCount === 0) {
            let responseBody = {
                status: "No object with id " + id
            }
            res.status(404).send(responseBody);
        }
        else {
            let responseBody = {
                status: "Object with id " + id + " has been successfully deleted."
            }
            res.send(responseBody);
        }
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
            query.category = ObjectId(req.query.category)
        }
        if (req.query.tags) {
            query.tags = ObjectId(req.query.tags)
        }

        // Get all objects that match the query
        const result = await collection.find(query).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//--------------------------------------------------------------------------------------------------
// Get ideas by category and aggregate tags
//--------------------------------------------------------------------------------------------------
app.get('/api/ideas/*', async (req, res) => {
    try {
        const collection = database.collection('ideas');

        const pipeline = [
            {
              '$lookup': {
                'from': 'tags', 
                'localField': 'tags', 
                'foreignField': '_id', 
                'as': 'tagsObject'
              }
            }, {
              '$match': {
                'category': ObjectId(req.query.category)
              }
            }
          ]
        const res2 = collection.aggregate(pipeline).toArray(function (err, data) {
            if (!err) {
                res.send(data)
            }
        })
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//--------------------------------------------------------------------------------------------------
// Create a new idea
//--------------------------------------------------------------------------------------------------
app.post('/api/ideas', async (req, res) => {
    try {
        const collection = database.collection('ideas');

        var idea = {
            name: req.body.name,
            category: ObjectId(req.body.category),
            tags: req.body.tags.map(ObjectId)
        };
        const result = await collection.insertOne(idea);

        res.status(201).send({ _id: result.insertedId });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//--------------------------------------------------------------------------------------------------
// Update an idea
//--------------------------------------------------------------------------------------------------
app.put('/api/ideas/:id', async (req, res) => {

    let id = ObjectId(req.params.id);
    let idea = req.body;
    idea.category = ObjectId(idea.category)
    idea.tags =  req.body.tags.map(ObjectId)
    delete idea._id; // delete the _id from the object, because the _id cannot be updated

    try {
        const collection = database.collection('ideas');
        const query = { _id: id }; // filter by id
        const result = await collection.updateOne(query, { $set: idea });

        if (result.matchedCount === 0) {
            let responseBody = {
                status: "No object with id " + id
            }
            res.status(404).send(responseBody);
        }
        else {
            res.send({ status: "Object with id " + id + " has been updated." });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//--------------------------------------------------------------------------------------------------
// Delete an idea
//--------------------------------------------------------------------------------------------------
app.delete('/api/ideas/:id', async (req, res) => {

    // read the path parameter :id
    let id = req.params.id;

    try {
        const collection = database.collection('ideas');
        const query = { _id: ObjectId(id) }; // filter by id
        const result = await collection.deleteOne(query);

        if (result.deletedCount === 0) {
            let responseBody = {
                status: "No object with id " + id
            }
            res.status(404).send(responseBody);
        }
        else {
            let responseBody = {
                status: "Object with id " + id + " has been successfully deleted."
            }
            res.send(responseBody);
        }
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
            query.category = ObjectId(req.query.category)
        }

        // Get all objects that match the query
        const result = await collection.find(query).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//--------------------------------------------------------------------------------------------------
// Create a new tag
//--------------------------------------------------------------------------------------------------
app.post('/api/tags', async (req, res) => {
    try {
        const collection = database.collection('tags');

        var tag = {
            name: req.body.name,
            category: ObjectId(req.body.category)
        };
        const result = await collection.insertOne(tag);

        res.status(201).send({ _id: result.insertedId });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//--------------------------------------------------------------------------------------------------
// Update a tag
//--------------------------------------------------------------------------------------------------
app.put('/api/tags/:id', async (req, res) => {

    let id = ObjectId(req.params.id);
    let tag = req.body;
    delete tag._id;
    delete tag.category;

    try {
        const collection = database.collection('tags');
        const query = { _id: id }; // filter by id
        const result = await collection.updateOne(query, { $set: tag });

        if (result.matchedCount === 0) {
            let responseBody = {
                status: "No object with id " + id
            }
            res.status(404).send(responseBody);
        }
        else {
            res.send({ status: "Object with id " + id + " has been updated." });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//--------------------------------------------------------------------------------------------------
// Delete a tag
//--------------------------------------------------------------------------------------------------
app.delete('/api/tags/:id', async (req, res) => {

    // read the path parameter :id
    let id = req.params.id;

    try {
        const collection = database.collection('tags');
        const query = { _id: ObjectId(id) }; // filter by id
        const result = await collection.deleteOne(query);

        if (result.deletedCount === 0) {
            let responseBody = {
                status: "No object with id " + id
            }
            res.status(404).send(responseBody);
        }
        else {
            let responseBody = {
                status: "Object with id " + id + " has been successfully deleted."
            }
            res.send(responseBody);
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})
// Start the server
server.listen(port, () => console.log("app listening on port " + port));