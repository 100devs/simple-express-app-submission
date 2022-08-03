const express = require("express");
const { req } = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 3001;
const cors = require("cors");
app.use(cors());
require("dotenv").config();

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = "rainbow-brite-characters";

MongoClient.connect(dbConnectionStr, {
  useUnifiedTopology: true,
}).then((client) => {
  console.log(`Connected to ${dbName} Database`);
  const db = client.db(dbName);
  const friendsCollection = db.collection("friends");

  app.set("view engine", "ejs");
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.get("/", (req, res) => {
    db.collection("friends")
      .find()
      .sort(/*{ likes: -1 }*/)
      .toArray()
      .then((data) => {
        res.render("index.ejs", { info: data });
      })
      .catch((error) => console.error(error));
  });

  app.post("/addRBCharacter", (req, res) => {
    console.log(req.body);
    friendsCollection
      .insertOne({
        name: req.body.name.trim(),
        favoriteColor: req.body.favoriteColor.trim(),
        otherAnimals: req.body.otherAnimals.trim(),
        spriteName: req.body.spriteName.trim(),
        likes: 0,
      })
      .then((result) => {
        console.log("Friend Added!");
        res.redirect("/");
      })
      .catch((error) => console.error(error));
  });

  app.put("/addOneLike", (req, res) => {
    console.log(req.body);
    friendsCollection
      .updateOne(
        {
          name: req.body.friendNameF.trim(),
          favoriteColor: req.body.favoriteColorF.trim(),
          otherAnimals: req.body.otherAnimalsF.trim(),
          spriteName: req.body.spriteNameF.trim(),
          likes: req.body.likesS,
        },
        {
          $set: {
            likes: req.body.likesS + 1,
          },
        },
        {
          // sort: { _id: -1 },
          upsert: true,
        }
      )
      .then((result) => {
        console.log("Added One Like");
        res.json("Like Added");
      })
      .catch((error) => console.error(error));
  });

  app.delete("/deleteCharacter", (req, res) => {
    console.log(req.body);
    friendsCollection
      .deleteOne({ name: req.body.friendNameF.trim() })
      .then((result) => {
        console.log("Friend Deleted");
        res.json("Friend Deleted");
      })
      .catch((error) => console.error(error));
  });

  app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}.`);
  });
});
