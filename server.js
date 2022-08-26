import express from 'express';
import * as dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';
// uses project root directory
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// database setup
let database;
const dbName = 'dailyLog';
let dailyLogCollection;
const client = new MongoClient(process.env.DB_URL);

async function startDB() {
  try {
    // Connect the client to the server
    await client.connect();

    console.log(`Connected to ${dbName} Database`);

    // returns db object
    database = client.db(dbName);

    // return the new Collection instance
    dailyLogCollection = database.collection('logs');
  } catch (err) {
    console.error(err);
  }
}

// janky af
(async () => await startDB())();

// express
const app = express();

// Application Settings
app.set('view engine', 'ejs');
// Middleware

// will look in public directory, so links don't need the public directory in the path
// works for nested folders too
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ejs path
const indexFilePath = path.join(__dirname, 'views', 'index.ejs');

app.get('/', async (req, res) => {
  try {
    // returns a cursor, with no filter return all (this talks to DB aka a promise)
    const allLogs = await dailyLogCollection.find().toArray();

    const logArray = allLogs.map((item) => item.description);

    res.render(indexFilePath, { logs: logArray });
    // res.sendFile(path.join(__dirname, 'index.html'));
  } catch (err) {
    console.log('💣💣💣 THERE WAS AN ERROR 💣💣💣');
    console.error(err);
  }
});

app.post('/newLog', async (req, res) => {
  const logItemObj = {
    description: req.body.item,
    time: 'nothing yet',
  };

  const insertResult = await dailyLogCollection.insertOne(logItemObj);

  console.log(`item was inserted: ${insertResult.acknowledged}`);

  res.json(insertResult.acknowledged).status(204);
});

app.delete('/delete', async (req, res) => {
  const query = {
    description: { $in: req.body },
  };

  const deleteManyResult = await dailyLogCollection.deleteMany(query);

  console.log(
    `${deleteManyResult.deletedCount} items were deleted: ${deleteManyResult.acknowledged}`
  );
  res.status(204);
});

const PORT = 3000;
app.listen(process.env.PORT || PORT, (err) => {
  console.log(`Server is listening on ${process.env.PORT || PORT}`);
});
