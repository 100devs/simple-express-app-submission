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
app.use(express.static("public"));

// middleware to parse the req.body, returning any type
app.use(express.urlencoded({ extended: true }));

// middleware to parse the req.body from JSON
app.use(express.json());

app.get("/", async (request, response) => {
	// This mongodb search returns all "entries" entries
	const entries = await db
		.collection("entries")
		.find()
		.sort({ "date": -1 })
		.toArray();
	console.log(entries);

	// This render response sends the now modified ejs to the user
	response.render("index.ejs", { entries: entries });
});

// This express router creates new log entries from the form
app.post("/addEntry", (req, res) => {
	// create a new document in the collection "entries"
	db.collection("entries")
		.insertOne({
			summary: req.body.summary,
			date: req.body.date,
			cause: req.body.cause,
			action: req.body.action,
			result: req.body.result,
			learned: req.body.learned,
		})
		.then((result) => {
			console.log(`Log entry ${result.insertedId} added`);
			console.log("You have updated your journal.");
			res.redirect("/");
		})
		.catch((err) => {
			console.log(err);
		});
});

app.delete("/deleteEntry", (req, res) => {
	db.collection("entries")
		.deleteOne({ summary: req.body.entryFromJS })
		.then((result) => {
			console.log(result);
			console.log("Log Entry Deleted");
			res.json("Log Entry Deleted");
		})
		.catch((err) => console.error(err));
});

app.listen(process.env.PORT || PORT, () => {
	console.log(`Server running on port ${PORT}`);
	serverRunning = true;
});
