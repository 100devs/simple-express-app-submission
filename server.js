const bodyParser = require("body-parser");
const ejs = require("ejs");
const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

require("dotenv").config();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());

const PORT = 4545;
const connectionString = process.env.DB_STRING;

let db, hacksCollection;

MongoClient.connect(connectionString, (err, client) => {
    if (err) return console.error(err);
    console.log("Connected to the database");

    db = client.db("nd-hacks");
    hacksCollection = db.collection("hacks")
    
    
    //see the list of hacks
    app.get("/", async (req, res) => {
        const hacks = await hacksCollection.find().toArray();
        res.render("index.ejs", {hacks: hacks});
    });
    
    //add a new hack
    app.post("/add-hack", async (req, res) => {
        // console.log(req.body.text);
        // console.log(req.body.conditions);
        try {
        const add = await hacksCollection.insertOne({text: req.body.text, helpCount: 0, conditions: [req.body.conditions.split(",")]});
        // console.log(add);
        res.redirect("/")
        } catch(err) {
            console.error(err);
        }
    });

    //"this helped me!"
    // TODO: could add specific diagnosis
    app.put("/helped-me", async (req, res) => {
        try {
            const inc = await hacksCollection.findOneAndUpdate( 
                {text: req.body.text}, 
                {
                    $inc: {
                        helpCount: 1
                    }
                }, 
                {
                    upsert: false
                });
            res.json("Help count updated");
        } catch(err) {
            console.error(err);
        }
    });

    //delete (spam)
    app.delete("/delete-hack", async (req, res) => {
        console.log(req.body.text);
        try {
            const del = await hacksCollection.deleteOne( {text: req.body.text})
            console.log(`Hack '${req.body.text}' deleted`);
            res.json(`Hack '${req.body.text}' deleted`);
        } catch(err) {
            console.error(err);
        }
    });

    //run the server
    app.listen(process.env.port || PORT, () => {
        console.log(`Server is running on port ${process.env.port || PORT}`);
    });

});