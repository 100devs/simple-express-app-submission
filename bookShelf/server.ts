import { NextFunction, Request, Response } from "express";
import { ClientSession, Db, DeleteResult, FindOneAndUpdateOptions, Promise, ServerSession } from "mongodb";

const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");
dotenv.config();

const connectionString: string = `mongodb+srv://${process.env.USER}:${process.env.PW}@cluster0.ajgf3.mongodb.net/?retryWrites=true&w=majority`;

MongoClient.connect(connectionString, (err: Error, client: any) => {
  console.log("Connected to database");
  const db = client.db("bookshelf");
  const bookCollection = db.collection("books");

  // middleware
  app.set("view engine", "ejs");
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static("public"));
  app.use(trafficLog);


  // basic rendering of site with dataset
  app.get("/", (req: Request, res: Response) => {

    const cursor = db
      .collection("books")
      .find()
      .sort({ title: 1 })
      .toArray()
      .then((results: string[]) => {
        res.render("index.ejs", { books: results, manage: false });
      })
      .catch((error: Error) => console.error(error));
  });

  // management console for
  app.get("/manage", (req: Request, res: Response) => {

    const cursor = db
      .collection("books")
      .find()
      .sort({ title: 1 })
      .toArray()
      .then((results: string[]) => {
        res.render("index.ejs", { books: results, manage: true });
      })
      .catch((error: Error) => console.error(error));
  })

  app.post("/book-input-new", (req: Request, res: Response) => {
    bookCollection.insertOne(req.body).then((result: Promise) => {
      res.redirect("/manage");
    });
  });

  app.put("/book-input-list", (req: Request, res: Response) => {
    console.log(req.body);
    bookCollection
      .findOneAndUpdate(
        { title: req.body.title },
        {
          $set: req.body,
        },
        {
          upsert: true,
        }
      )
      .then((result: FindOneAndUpdateOptions) => {
        res.json("Success");
      })
      .catch((error: Error) => console.error(error));
  });

  app.delete("/book-input-remove", (req: Request, res: Response) => {
    console.log(req.body);
    bookCollection
      .deleteOne({ title: req.body.title })
      .then((result: DeleteResult) => {
        if (result.deletedCount === 0) {
          return res.json("No title deleted");
        }
        res.json(`Deleted title: ${req.body.title}`);
      })
      .catch((error: Error) => console.error(error));
  });

  app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
  });
});

// logging middleware to make requests plain
const trafficLog = (req: Request, res: Response, next: NextFunction) => {
  if (Object.keys(req.body).length !== 0) {
    console.log(req.method , req.body);
  }
  next();
}