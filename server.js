require("dotenv").config();
const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = "futurama";

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then((client) => {
    console.log(`Connected to ${dbName} database`);
    db = client.db(dbName);
  })
  .catch((err) =>
    console.error("Failure to connect: ", err.message, err.stack)
  );

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use((req, res, next) => {
  res.locals.charResults = null;
  next();
});

app.get("/", (req, res) => res.render("index"));

app.get("/getCharResults", async (req, res) => {
  let { charName } = await req.query;
  const regex = new RegExp(charName, "gi");
  try {
    const characterDb = await db
      .collection("characters")
      .find({
        $or: [{ name: { $regex: regex } }, { nickname: { $regex: regex } }]
      })
      .toArray();
    console.log(characterDb);
    if (characterDb.length) {
      return res.render("index", { charResults: characterDb });
    }
    return res.render("index", { charResults: null });
  } catch (err) {
    console.error(err);
  }
});

// const paths = {
//   boron: "Nobody doesn't like Molten Boron!",
//   popplers: "Pop a Poppler in your mouth when you eat a Fishy Joe's!"
// };
// app.get("/:path", (req, res) => {
//   const path = req.params.path;
//   res.json({
//     statement:
//       paths[path] || "I am Bender, please insert girder (file path not found)"
//   });
// });
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

/* next steps:
1. make a generate random character button (random based on id)
2. have option to add CHANGE_THIS_TO_COLLECTION to list
(check index.ejs for html next steps)
*/
