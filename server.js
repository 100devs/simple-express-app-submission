require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

let db, gamesCollection;

MongoClient.connect(process.env.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((client) => {
    console.log(`Connected to database`);
    db = client.db("video_game_tracker");
    gamesCollection = db.collection("games");
  })
  .catch((error) => console.error(error));

app.set("view engine", "ejs");
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", async (req, res) => {
  try {
    let games = await gamesCollection.find().toArray();
    res.render("index", { games });
  } catch (error) {
    console.error(error);
  }
});

app.post("/api/new-game", async (req, res) => {
  try {
    let newGame = req.body;
    let addedGame = await gamesCollection.insertOne(newGame);
    res.json(addedGame);
  } catch (error) {
    console.error(error);
  }
});

app.put("/api/update-game/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let updatedGame = await gamesCollection.findOneAndUpdate(
      { _id: ObjectId(id) },
      {
        $set: {
          name: req.body.name,
          genre: req.body.genre,
          rating: req.body.rating,
          completed: req.body.completed,
        },
      }
    );
    res.json(updatedGame);
  } catch (error) {
    console.error(error);
  }
});

app.delete("/api/delete-game/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let deletedGame = await gamesCollection.deleteOne({
      _id: ObjectId(id),
    });
    res.json(deletedGame);
  } catch (error) {
    console.error(error);
  }
});

app.listen(process.env.PORT, () => console.log("server is running"));
