// declare node.js module variables.
const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

// test variables
let serverRunning = false;

// enable dotenv for secrets
require("dotenv").config();
const PORT = process.env.PORT;

// mongo variables
let db,
	dbString = process.env.DB_STRING;
dbName = "entries";

// mongo connection
MongoClient.connect(dbString).then((client) => {
	console.log(`Connected to ${dbName}`);
	db = client.db(dbName);
});

// enable ejs
// app.use("view engine", "ejs");

// enable use of public folder
// app.use(express.station("public"));

// middleware to parse the req.body, returning any type
app.use(express.urlencoded({ extended: true }));

// middleware to parse the req.body from JSON
app.use(express.json());

app.get("/", async (request, response) => {
	// This mongodb search returns all "todos" entries
	const entries = await db.collection("todos").find().toArray();

	// This render response sends the now modified ejs to the user
	response.render("index.ejs", { entries: entries });
});

app.listen(process.env.PORT || PORT, () => {
	console.log(`Server running on port ${PORT}`);
	serverRunning = true;
});
