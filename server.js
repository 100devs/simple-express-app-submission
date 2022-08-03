const bodyParser = require("body-parser");
const ejs = require("ejs");
const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

const PORT = 4545;

require("dotenv").config({path: "/.env"})
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());


// const connectionString = process.env.DB_STRING;
//TODO set up env variable so this doesn't get pushed!
const connectionString = "mongodb+srv://no"

let db, hacksCollection;

console.log(connectionString)
MongoClient.connect(connectionString, (err, client) => {
    if (err) return console.error(err);
    console.log("Connected to the database");

    db = client.db("nd-hacks");
    hacksCollection = db.collection("hacks")
});


//see the list of hacks
app.get("/", async (req, res) => {
    const hacks = await hacksCollection.find().toArray();
    res.render("index.ejs", {hacks: hacks});
});

//add a new hack
app.post("/add-hack", async (req, res) => {
    try {
        const add = await hacksCollection.insertOne(req.body);
        console.log(add);
        res.redirect("/")
    } catch(err) {
        console.error(err);
    }
});

//"this helped me!"
//with specific diagnosis?
//TODO unfinished
app.put("/helped-me", async (req, res) => {
    hacksCollection.findOneAndUpdate(
        //TODO add to like count
        //TODO update list w/ diagnoses
    )
});

//delete (spam)
app.delete("/delete-hack", async (req, res) => {
    try {
        const del = await hacksCollection.deleteOne( {id: req.body.text})
        console.log(`Hack ${req.body.text} deleted`);
        res.json(`Hack ${req.body.text} deleted`);
    } catch(err) {
        console.error(err);
    }
});

//run the server
app.listen(process.env.port || PORT, () => {
    console.log(`Server is running on port ${process.env.port || PORT}`);
});
