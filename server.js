const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { response } = require("express");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const connectionString = process.env.DB_STRING;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

let db,
    dbConnection = process.env.DB_STRING,
    dbName = "anime-watch-list";

MongoClient.connect(dbConnection, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} database`);
        db = client.db(dbName);
    });

app.get("/", async (request, response) => {
    const showList = await db.collection("shows").find().toArray();
    const showsLeft = await db.collection("shows").countDocuments({ completed: false });
    response.render("index.ejs", { shows: showList, left: showsLeft });
});

app.post("/addShow", (request, response) => {
    db.collection("shows").insertOne({ thing: request.body.showItem, completed: false })
    .then(result => {
        console.log("Show added");
        response.redirect("/");
    })
    .catch(error => console.log(`error: ${error}`));
});

app.put("/markComplete", (request, response) => {
    db.collection("shows").updateOne( {thing: request.body.itemFromJS }, {
        $set: {
            completed: true
        }
    })
    .then(result => {
        console.log("Show complete");
        response.json("Show complete");
    })
    .catch(error => console.log(`error: ${error}`));
});

app.put("/markIncomplete", (request, respopnse) => {
    db.collection("shows").updateOne({ thing: request.body.itemFromJS }, {
        $set: {
            completed: false
        }
    })
    .then(result => {
        console.log("Show incomplete");
        response.json("Show incomplete");
    })
    .catch(error => console.log(`error: ${error}`));
});

app.delete("/deleteShow", (request, response) => {
    db.collection("shows").deleteOne({ thing: request.body.itemFromJS })
    .then(result => {
        console.log("Show deleted");
        response.json("Show deleted");
    })
    .catch(error => console.log(`error: ${error}`));
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
