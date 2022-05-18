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
const client = new MongoClient(uri);

//////////////////////////////////////
//// ENDPOINTS ///////////////////////
//////////////////////////////////////

// Endpoints
app.get('/api/colors', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('Activity-Tracker');
        const messages = database.collection('colors');
        const result = await messages.find().toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    } finally {
        await client.close();
    }
})

// Start the server
server.listen(port, () => console.log("app listening on port " + port));