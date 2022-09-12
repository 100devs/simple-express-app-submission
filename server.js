// declare node.js module variables.
const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = process.env.PORT;

// enable dotenv for secrets
require("dotenv").config();

// mongo variables
let db,
	dbString = process.env.DB_STRING;
dbName = "entries";

// mongo connection
MongoClient.connect(dbString, { useUnifiedTopography: true }).then((client) => {
	console.log(`Connected to ${dbName}`);
	db = client.db(dbName);
});

// enable ejs
app.use("view engine", "ejs");

// enable use of public folder
app.use(express.station("public"));

// middleware to parse the req.body, returning any type
app.use(express.urlencoded({ extended: true }));

// middleware to parse the req.body from JSON
app.use(express.json());
