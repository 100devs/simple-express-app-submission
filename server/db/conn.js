const env = process.env.NODE_ENV;
const mongoose = require('mongoose');
require('dotenv').config({ path: '../config.env' });

// testing environment selection
const Db = (env === 'test') ? process.env.ATLAS_URI_TEST : process.env.ATLAS_URI;

let dbConnection;

module.exports = {
  connectToServer() {
    dbConnection = mongoose.connect(Db, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log(`Connected to ${env} database`);
      })
      .catch((err) => console.log(err));
  },

  getDb() {
    return dbConnection;
  },
};
