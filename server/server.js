const express = require("express");
const app = express();
const PORT = 8080;
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const mongoClient = require("mongodb").MongoClient;
const db_connectionString = process.env.connection_string;
const ObjectId = require("mongodb").ObjectId;
//connecting to the database, using the useunifiedTopology returns a promise
app.use(cors());
app.use(express.json());
//so we can use .then and .catch

mongoClient
  .connect(db_connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("You have connected to the Database");
    db = client.db("Notes-API");
    const notesCollection = db.collection("notes-info");
    app.use(express.static("public"));
    app.use(express.urlencoded({ extended: true }));
    app.get("/", (req, res) => {
      res.send("Hello");
    });
    app.get("/notes", (req, res) => {
      notesCollection
        .find()
        .toArray()
        .then((data) => {
          console.log(data);
          res.json(data);
        })
        .catch((err) => console.error(err));
    });
    //add check to make sure task does not already exist in toDoList
    app.post("/notes", (req, res) => {
      notesCollection
        .insertOne({ task: req.body.task, description: req.body.description })
        .then((result) => {
          console.log("Succesfully added new item to database");
          res.json(result);
        })
        .catch((err) => console.error(err));
    });
    //put request is going to update our db
    //put request is currently not updating db, need to search for item in db that matches,
    // either the task or description and update the field that changed

    app.put("/notes", (req, res) => {
      //rethink how to update entries to check for uniqueness
      console.log(req.body);
      notesCollection
        .updateOne(
          { _id: ObjectId(req.body._id) },
          {
            $set: {
              task: req.body.task,
              description: req.body.description,
            },
          }
        )
        //response here comes from MongoDB
        .then((data) => {
          console.log("updated task entry");
          //this res comes from my put request
          res.json(data);
        })
        .catch((err) => console.error(err));
    });
    app.delete("/notes", (req, res) => {
      notesCollection
        .deleteOne({ _id: ObjectId(req.body._id) })
        .then((result) => {
          console.log("deleted one from database");
          res.json("ToDo deleted");
        })
        .catch((err) => console.error(err));
    });
    app.listen(process.env.PORT || PORT, () => {
      console.log(`The server is running on Port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
// (err,client)=>{
// if(err){
//     console.error(err)
// }
// console.log('You have connected to the Database')
// const db = client.db('Notes-API')
