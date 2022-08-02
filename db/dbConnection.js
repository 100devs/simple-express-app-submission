const { MongoClient } = require("mongodb");
const AtlasURI = process.env.ATLAS_URI;
const client = new MongoClient(AtlasURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
let database;

function connectToServer(callback) {
    const dbString = "accounting";
    client.connect((err, db) => {
        if(db) {
            database = db.db(dbString);
            console.log(`Successfully connected to MongoDB Atlas database: ${dbString}`);
        }
        return callback(err);
    });
}

function getDatabase() {
    return database;
} 

module.exports = { connectToServer, getDatabase }