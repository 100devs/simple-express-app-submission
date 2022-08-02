const express = require('express');
const app = express();
const PORT = 8000;
const mongoose = require('mongoose');

require('dotenv').config();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs')

let dbConnectionStr = process.env.DB_STRING

mongoose.Promise = global.Promise;

mongoose.connect(dbConnectionStr, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});



require('./app/routes/box.routes.js')(app);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Listening on ${process.env.PORT || PORT} and attempting to connect to ${process.env.DB_STRING}`)
})