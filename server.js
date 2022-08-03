const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 2121;
var ObjectId = require("mongodb").ObjectId;

// heroku config:set DB_STRING = blah blah blah connection string
// heroku login -i
// heroku create simple-rap-api
// echo "web: node server.js" > Procfile
// git add .
// git commit -m "changes"
// git push heroku main

require("dotenv").config();

let db,
	dbConnectionStr = process.env.DB_STRING,
	dbName = "idea";

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then((client) => {
	console.log(`Connected to ${dbName} Database`);
	db = client.db(dbName);
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (request, response) => {
	db.collection("ideas")
		.find()
		.sort({ likes: -1 })
		.toArray()
		.then((data) => {
			response.render("index.ejs", { info: data });
		})
		.catch((error) => console.error(error));
});

app.post("/addIdea", (request, response) => {
	db.collection("ideas")
		.insertOne({ ideaName: request.body.ideaName, description: request.body.description, likes: 0, hates: 0 })
		.then((result) => {
			console.log("Idea Added");
			response.redirect("/");
		})
		.catch((error) => console.error(error));
});

app.put("/addOneLike", (request, response) => {
	let reqID = request.body.iDS;
	reqID = new ObjectId(reqID); // wrap in ObjectID
	console.log(reqID);
	db.collection("ideas")
		.findOneAndUpdate(
			{ _id: reqID },
			{ $inc: { likes: 1 } },
			{
				upsert: false,
			}
		)
		.then((result) => {
			console.log("Added One Like");
			response.json("Like Added");
		})
		.catch((error) => console.error(error));
});

app.put("/addOneHate", (request, response) => {
	let reqID = request.body.iDS;
	reqID = new ObjectId(reqID); // wrap in ObjectID
	console.log(reqID);
	db.collection("ideas")
		.findOneAndUpdate(
			{ _id: reqID },
			{ $inc: { hates: 1 } },
			{
				upsert: false,
			}
		)
		.then((result) => {
			console.log("Added One Hate");
			response.json("Hate Added");
		})
		.catch((error) => console.error(error));
});

app.delete("/deleteIdea", (request, response) => {
    let reqID = request.body.iDS;
	reqID = new ObjectId(reqID); // wrap in ObjectID
	console.log(reqID);
	db.collection("ideas")
		.deleteOne({ _id: reqID })
		.then((result) => {
			console.log("Idea Deleted");
			response.json("Idea Deleted");
		})
		.catch((error) => console.error(error));
});

app.listen(process.env.PORT || PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
