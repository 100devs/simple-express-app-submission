const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const { response } = require("express");
const { ObjectID } = require("bson");
app.use(cors());
const PORT = 3001;
require("dotenv").config();

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = "CoffeeHelper";

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
  }
);

// MongoClient.connect(`mongodb+srv://jrgiacone:jg091398@cluster0.ngzso.mongodb.net/?retryWrites=true&w=majority` , { useUnifiedTopology: true})
//     .then(client => {
//         console.log(`Connected to ${dbName} Database`)
//         db = client.db(dbName)
//     })

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const coffeeMakers = {
  v60: {
    Name: "v60",
    Difficulty: "Hard",
    "Recommended Water (ml)": 360,
    "Recommended Water Temp (C)": 97,
    "Recommended Coffee (g)": 22,
    "Minimum Coffee (g)": 15,
    "Maximum Coffee (g)": 30,
    "Required Materials": [
      "Hario v60",
      "Paper Filters",
      "Gooseneck Kettle",
      "Groud Coffee",
    ],
  },
  aeropress: {
    Name: "Aeropress",
    Difficulty: "Medium",
    "Recommended Water (ml)": 250,
    "Recommended Water Temp (C)": 95,
    "Recommended Coffee (g)": 15,
    "Minimum Coffee (g)": 10,
    "Maximum Coffee (g)": 25,
    "Required Materials": [
      "Aeropress",
      "Aeropress Filters",
      "Hot Water",
      "Ground Coffee",
    ],
  },
  "french press": {
    Name: "French Press",
    Difficulty: "Easy",
    "Recommended Water (ml)": 540,
    "Recommended Water Temp (C)": 95,
    "Recommended Coffee (g)": 30,
    "Minimum Coffee (g)": 10,
    "Maximum Coffee (g)": 55,
    "Required Materials": ["French Press", "Ground Coffee", "Hot water"],
  },
  chemex: {
    Name: "Chemex",
    Difficulty: "Medium",
    "Recommended Water (ml)": 510,
    "Recommended Water Temp (C)": 97,
    "Recommended Coffee (g)": 30,
    "Minimum Coffee (g)": 20,
    "Maximum Coffee (g)": 44,
    "Required Materials": [
      "Hario v60",
      "Paper Filters",
      "Gooseneck Kettle",
      "Groud Coffee",
    ],
  },
  "moka pot": {
    Name: "Moka Pot",
    Difficulty: "Medium",
    "Recommended Water (ml)": 220,
    "Recommended Water Temp (C)": 99,
    "Recommended Coffee (g)": 15,
    "Minimum Coffee (g)": 10,
    "Maximum Coffee (g)": 20,
    "Required Materials": [
      "Hario v60",
      "Paper Filters",
      "Gooseneck Kettle",
      "Groud Coffee",
    ],
  },
  "vacuum pot": {
    Name: "Vacuum Pot",
    Difficulty: "Hard",
    "Recommended Water (ml)": 330,
    "Recommended Water Temp (C)": 99,
    "Recommended Coffee (g)": 20,
    "Minimum Coffee (g)": 15,
    "Maximum Coffee (g)": 40,
    "Required Materials": [
      "Hario v60",
      "Paper Filters",
      "Gooseneck Kettle",
      "Groud Coffee",
    ],
  },
  "clever dripper": {
    Name: "Clever Dripper",
    Difficulty: "Medium",
    "Recommended Water (ml)": 250,
    "Recommended Water Temp (C)": 97,
    "Recommended Coffee (g)": 18,
    "Minimum Coffee (g)": 15,
    "Maximum Coffee (g)": 40,
    "Required Materials": [
      "Hario v60",
      "Paper Filters",
      "Gooseneck Kettle",
      "Groud Coffee",
    ],
  },
  "Not Found": {
    Error: "Currently does not exist in system",
  },
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/", (req, res) => {
  // res.sendFile(__dirname + '/api.html')
  res.json(coffeeMakers);
});

app.get("/api/:name", (req, res) => {
  console.log(req.params.name);
  const coffeeStyle = req.params.name.toLowerCase();
  if (coffeeMakers[coffeeStyle]) {
    res.json(coffeeMakers[coffeeStyle]);
  } else {
    res.json(coffeeMakers["Not Found"]);
  }
});

// app.get('/getJournal'), (req, res) => {
//   db.collection('coffee').find({}).toArray()
//   .then((notes) => {
//     res.send(notes)
//     // console.log(notes)
//     // res.json(notes)
//     // res.json(notes)
//   }).catch(error => console.error(error))
// }

app.get("/getJournal/:userid&:selection", (req, res) => {
  db.collection(req.params.userid)
    .find({ selection: req.params.selection })
    .toArray()
    .then((result) => {
      // res.send(result)
      res.json(result);
    });
});

// app.get('/getJournal', (req, res) => {
//   db.collection('coffee').find({}).toArray((err, result) => {
//     if(err) throw err
//     res.send(result)
//   })
// })

app.post("/addJournal/:userid", (req, res) => {
  console.log("request received");
  db.collection(req.params.userid)
    .insertOne({
      date: req.body.date,
      notes: req.body.notes,
      ratio: req.body.ratio,
      recWater: req.body.recWater,
      coffeeGrams: req.body.coffeeGrams,
      selection: req.body.selection,
      time: req.body.time,
    })
    .then(() => {
      res.status(201).json("This was added!");
      // console.log('note added')
      // console.log(res.json())
      // res.json()
      // res.redirect('/coffee.html')
    })
    .catch((error) => console.error(error));
});

app.put("/updateJournal/:id&:userid", (req, res) => {
  db.collection(req.params.userid)
    .updateOne(
      { _id: new ObjectID(req.params.id) },
      {
        $set: {
          notes: req.body.newNote,
        },
      }
    )
    .then(() => {
      res.json();
    })
    .catch((error) => console.log(error));
});

app.delete("/deleteJournal/:id&:userid", (req, res) => {
  // console.log(req.params.id);
  // console.log(req.params.userid);
  db.collection(req.params.userid)
    .deleteOne({ _id: new ObjectID(req.params.id) })
    .then(() => {
      // console.log(result)
      res.json();
      console.log("deleted");
      // response.json('deleted')
    })
    .catch((error) => console.error(error));
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
