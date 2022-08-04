const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 3000;
require("dotenv").config();
const fetch = require("node-fetch");

let connectionString = process.env.DB_String;

MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(
  (client) => {
    console.log("i am connected");

    // creates the database for the app
    const db = client.db("APODHistory");

    // creates the collection that will hold the weights for the user
    const pictureCollection = db.collection("APOD");

    // lets the server know to expect ejs format
    app.set("view engine", "ejs");

    app.use(express.static("public"));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // the port that the server is listening for
    app.listen(process.env.PORT || PORT, () => {
      console.log(`Server running on port 3000`);
    });

    // displays the ejs
    app.get("/", (req, res) => {
      // cursor is the pointer to the collection of documents returned that we will use
      const cursor = pictureCollection
        .find()
        .toArray()
        .then((results) => {
          // this is the object that will be passed to ejs

          // console.log(results.map((x) => x.hdurl));
          // results is the array from the database use map to get the url from it
          res.render("index.ejs", {
            pictures: results.map((x) => x),
          });
        });
    });

    // takes the values from the form and puts them into the server
    app.post("/getPic", async (req, res) => {
      // req.body. allows me to pick which specific part of the form data i want to use
      // console.log(req.body.date);
      const url = `https://api.nasa.gov/planetary/apod?api_key=ebT5998P6DYNoZ3kSfAD1BJKdP4xEDWKljXfcjdW&date=${req.body.date}`;

      // use fetch just like you would in regular js
      let response = await fetch(url);
      let data = await response.json();

      // console.log(data.hdurl);

      pictureCollection
        .insertOne(data)
        .then((result) => res.redirect("/"))
        .catch((error) => console.error(error));
    });

    app.put("/fav", (req, res) => {
      // console.log(req.body.hdurl);
      pictureCollection.updateOne(
        { hdurl: req.body.hdurl },
        {
          $set: { favorite: true },
        }
      );
    });

    app.put("/noFav", (req, res) => {
      console.log(req.body.jsUrl);
      pictureCollection
        .updateOne(
          { hdurl: req.body.jsUrl },
          {
            $set: { favorite: false },
          }
        )
        .then((result) => res.redirect("/"));
      console.log(req.body);
    });
  }
);
