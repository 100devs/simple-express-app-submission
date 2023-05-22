// https://zellwk.com/blog/crud-express-mongodb/
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const { GridFSBucket } = require("mongodb");
const storage = new GridFsStorage({
  url: "mongodb+srv://12nmcguire:a0uC7h7gXC3I9svt@cluster0.jeadbpg.mongodb.net/crud-text?retryWrites=true&w=majority",
});
const upload = multer({ storage });

PORT = process.env.PORT || 3000;

const myApplication = express();

MongoClient.connect(
  "mongodb+srv://12nmcguire:a0uC7h7gXC3I9svt@cluster0.jeadbpg.mongodb.net/images?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
)
  .then((client) => {
    console.log(`Connected to database`);
    const db = client.db("crud-text");
    const images = db.collection("images");

    myApplication.use(bodyParser.urlencoded({ extended: true }));
    myApplication.use(express.static("public"));
    myApplication.use(bodyParser.json());
    myApplication.set("view engine", "ejs");

    myApplication.listen(PORT, function () {
      console.log(`listening on ${PORT}`);
    });

    // myApplication.get(endpoint, callback)
    myApplication.get("/", (request, response) => {
      // response.sendFile(__dirname + "/index.html")
      // console.log(__dirname)

      // read text
      const cursor = db
        .collection("images")
        .find()
        .toArray()
        .then((results) => {
          console.log(results);
          response.render("index.ejs", { imageArray: results });
        })
        .catch((err) => console.error(err));

      const bucket = new GridFSBucket(db, {
        bucketName: "fs",
      });

      console.log(bucket);
    });

    myApplication.post(
      "/images",
      upload.single("image"),
      (request, response) => {
        images
          .insertOne(request.file)
          .then((result) => {
            console.log("redirecting");
            response.redirect("/");
          })
          .catch((err) => console.error(err));
      }
    );

    myApplication.put("/images", (request, response) => {
      images
        .findOneAndUpdate(
          {},
          {
            $set: {
              images: request.body.image,
            },
          },
          {
            upsert: true,
          }
        )
        .then((result) => response.json("successfully updated image"))
        .catch((err) => console.error(err));
    });

    myApplication.delete("/images", (request, response) => {
      images
        .deleteOne()
        .then((result) => {
          response.json("Deleted quote");
        })
        .catch((err) => console.error(err));
    });
  })
  .catch((err) => console.error(err));