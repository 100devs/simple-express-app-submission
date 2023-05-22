// https://zellwk.com/blog/crud-express-mongodb/

const express = require("express")
const bodyParser = require("body-parser")
const MongoClient = require("mongodb").MongoClient
const PORT = process.env.PORT || 3000

const myApplication = express()

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
          response.render("index.ejs", { textArray: results });
        })
        .catch((err) => console.error(err));
    });

    myApplication.post("/images", (request, response) => {
      console.log(request.body);
      images
        .insertOne(request.body)
        .then((result) => {
          console.log("redirecting");
          response.redirect("/");
        })
        .catch((err) => console.error(err));
    });

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

// async function connectMongoClient(MongoClient) {
//   try {
//     const mongoClient = await MongoClient.connect()

//     console.log(mongoClient)
//     return mongoClient
//   } catch (errors) {
//     console.error(errors)
//   }
// }

// connectMongoClient(MongoClient)
