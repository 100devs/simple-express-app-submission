const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv").config();
const dbConnectionStr = process.env.DB_STRING;
const PORT = process.env.PORT || 3000;

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then(client => {
    console.log("Connected to database!");
    const db = client.db("darkplace-quotes");
    const quotesCollection = db.collection("quotes");

    app.set("view engine", "ejs");

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static("public"));

    app.get('/', (req, res) => {
      db.collection("quotes").find().toArray()
        .then(results => {
          res.render("index.ejs", { quotes: results })
        })
        .catch(error => console.error(error));
    });

    app.post("/quotes", (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/');
        })
        .catch(error => console.error(error));
    });

    app.put("/quotes", (req, res) => {
      quotesCollection.findOneAndUpdate(
        { name: "Madeleine Wool / Dr. Liz Asher" },
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote
          }
        },
        {
          upsert: true
        }
      )
        .then(result => {
          res.json("Success!");
        })
        .catch(error => console.error(error));
    });

    app.delete("/quotes", (req, res) => {
      quotesCollection.deleteOne(
        { name: req.body.name }
      )
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json("No quotes to delete!");
          }
          
          res.json("Deleted Dean's quote!");
        })
        .catch(error => {
          console.error(error);
        });
    });

    app.listen(PORT, function() {
      console.log(`Server running on port ${PORT}!`);
    });

  })
  .catch(error => console.error(error));