// App on Heroku: https://schedule-shuffler.herokuapp.com/

const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = process.env.PORT || 3001;
// const morgan = require("morgan");

require("dotenv").config();
let db,
  connectionString = process.env.DB_STRING,
  collection;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan("dev"));
app.use(express.static("public"));

// class representing a user
class User {
  constructor(user) {
    const initValues = [
      "study",
      "study",
      "study",
      "work",
      "work",
      "work",
      "break",
      "break",
    ];
    this.defaultOptions = initValues;
    this.remainingOptions = initValues;
    this.remainingDays = 7;
    this.user = user;
    this.lastDraw = "";
  }
}

// Couldn't store in mongoDB as object method (might be possible but too complex for the moment)
function shuffleAndDraw(obj) {
  const array = obj.remainingOptions;
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  const result = array.shift();
  obj.lastDraw = result;
  return result;
}

MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(
  (client) => {
    console.log("Connected to database.");
    db = client.db("weekSchedule");
    collection = db.collection("schedules");
    // Starts the server
    app.listen(process.env.PORT || PORT, () =>
      console.log(`Listening on ${PORT}`)
    );
  }
);

// Get on default route
app.get("/", async (req, res) => {
  //
  const username = req.query.user;
  // change action depending on query
  if (username) {
    console.log(`username: ${username}`);
    console.log(collection.findOne);
    const user = await collection.findOne({ user: username });
    if (user) {
      res.render("index.ejs", { user: user });
    } else {
      res.render("index.ejs", { user: `${username} not found.` });
    }
  } else {
    // if no query, this renders
    res.render("index.ejs", { user: false });
  }
});
// shouldn't keep, returns a list of every user
app.get("/users", async (req, res) => {
  const users = new Array();
  await collection.find().forEach((schedule) => users.push(schedule.user));
  console.log(users);
  res.json(users);
});

// Create a new user
app.post("/", async (req, res) => {
  const username = req.body.user;
  const exists = await collection.countDocuments({ user: username });

  if (!exists) {
    const newUser = new User(username);
    await collection.insertOne(newUser);
    res.render("index.ejs", { user: newUser });
  } else {
    res.render("index.ejs", { user: `${username} already exists.` });
  }
});
// Deletes a user
app.post("/delete", async (req, res) => {
  const username = req.body.user;
  if (username === "placeholder") {
    res.status(400).send("Bad Request: cannot delete placeholder");
    return;
  }
  const exists = await collection.countDocuments({ user: username });
  if (exists) {
    await collection.deleteOne({ user: username });
    res.status(204).end();
  } else res.status(404).send("User not found.");
});

// Adds one or more options to the user's list
app.patch("/addOptions", async (req, res) => {
  const username = req.body.user;
  if (!req.body.items || !Array.isArray(req.body.items)) {
    res.status(401).send("Items not sent as array.");
    return;
  }
  const user = await collection.findOne({ user: username });
  if (user) {
    await collection.updateOne(
      { user: username },
      {
        $set: {
          remainingOptions: user.remainingOptions.concat(req.body.items),
        },
      }
    );
    res.status(204).end();
  } else res.status(404).send("User not found.");
});
// Draws one and updates document
app.post("/draw", async (req, res) => {
  // when user info is gotten, have a query in the address bar for that user. Pass that to the /draw request
  console.log(req.body);
  const username = req.body.user || "placeholder";
  let user = await collection.findOne({ user: username });
  if (user.remainingDays === 0) {
    res.json({ error: "Out of days." });
    return;
  }
  if (user.remainingOptions.length === 0) {
    res.json({ error: "Out of options." });
    return;
  }
  const day = shuffleAndDraw(user);
  // updating document
  await collection.updateOne(
    { user: username },
    {
      $set: {
        remainingOptions: user.remainingOptions,
        remainingDays: user.remainingDays - 1,
        lastDraw: user.lastDraw,
      },
    }
  );
  user = await collection.findOne({ user: username });
  res.json(user);
});

// Resets a user's schedule
app.put("/reset", async (req, res) => {
  const username = req.body.user;
  const user = await collection.findOne({ user: username });
  if (user) {
    await collection.updateOne(
      { user: username },
      {
        $set: {
          remainingOptions: user.defaultOptions,
          remainingDays: 7,
          lastDraw: "None, reset!",
        },
      }
    );
    res.status(204).send("User reset to default.");
    return;
  } else {
    res.status(404).send("User not found");
  }
});
app.patch("/replaceDefaults", async (req, res) => {
  const username = req.body.user;
  console.log(req.body);
  let newDefaults;
  if (Array.isArray(req.body.newDefaults)) {
    newDefaults = req.body.newDefaults;
  } else {
    res
      .status(400)
      .send({ error: "New defaults not received or not correct type (array)" });
    return;
  }
  const user = await collection.findOne({ user: username });
  if (user) {
    await collection.updateOne(
      { user: username },
      {
        $set: {
          defaultOptions: newDefaults,
        },
      }
    );
    res.json({ message: "Default options changed." });
    return;
  } else {
    res.status(404).send({ message: "User not found." });
  }
});
