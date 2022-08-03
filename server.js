const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 2121;
require("dotenv").config();

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = "drinksDB";

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

app.get("/", (request, response) => {
  db.collection("drinks")
    .find()
    .toArray()
    .then((data) => {
      response.render("index.ejs", { info: data });
    })
    .catch((error) => console.error(error));
});

app.post("/addDrink", (request, response) => {
  db.collection("drinks")
    .insertOne({
      name: request.body.name,
      type: request.body.type,
      size: request.body.size,
      units: 0,
    })
    .then((result) => {
      console.log("Drink Added");
      response.redirect("/");
    })
    .catch((error) => console.error(error));
});

app.put("/addOneUnit", (request, response) => {
  db.collection("drinks")
    .updateOne(
      {
        name: request.body.nameS,
        type: request.body.typeS,
        size: request.body.sizeS,
        units: request.body.unitsS,
      },
      {
        $set: {
          units: request.body.unitsS + 1,
        },
      },
      {
        sort: { _id: -1 },
        upsert: true,
      }
    )
    .then((result) => {
      console.log("Added One Unit");
      response.json("Unit Added");
    })
    .catch((error) => console.error(error));
});

app.delete("/deleteDrink", (request, response) => {
  db.collection("drinks")
    .deleteOne({ name: request.body.nameS })
    .then((result) => {
      console.log("Drink Deleted");
      response.json("Drink Deleted");
    })
    .catch((error) => console.error(error));
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
