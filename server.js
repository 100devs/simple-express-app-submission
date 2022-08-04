const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const PORT = 8000;
require("dotenv").config();

app.use(cors());

let db;
let dbName = "nba-api";
let dbConnectionStr = process.env.DB_STRING;

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
  }
);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  db.collection("nba-players")
    .find()
    .sort({ likes: -1 })
    .toArray()
    .then((data) => {
      res.render("index.ejs", { info: data });
    })
    .catch((err) => console.error(err));
});

app.post("/addPlayer", (req, res) => {
  db.collection("nba-players")
    .insertOne({
      fullName: req.body.fullName,
      currentTeam: req.body.currentTeam,
      rings: req.body.rings,
      likes: 0,
    })
    .then((result) => {
      console.log("Player Added");
      res.redirect("/");
    })
    .catch((err) => console.error(err));
});

app.put("/addOneLike", (req, res) => {
  db.collection("nba-players")
    .updateOne(
      {
        fullName: req.body.fullNameS,
        currentTeam: req.body.currentTeamS,
        rings: req.body.rings,
        likes: req.body.likesS,
      },
      {
        $set: {
          likes: req.body.likesS + 1,
        },
      },
      {
        sort: { _id: -1 },
        upsert: true,
      }
    )
    .then((result) => {
      console.log("Added One Like");
      res.json("Like Added");
    })
    .catch((err) => console.error(err));
});

app.delete("/deletePlayer", (req, res) => {
  db.collection("nba-players")
    .deleteOne({ fullName: req.body.fullNameS })
    .then((result) => {
      console.log("Player Deleted");
      res.json("Player Deleted");
    })
    .catch((err) => console.error(err));
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
