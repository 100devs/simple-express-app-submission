// env variable
require('dotenv').config({ path: './config.env' });

// import express and configure
const express = require('express');

const app = express();
app.use(express.json());

// use cors
const cors = require('cors');

app.use(cors());

// import routes
const mainRoutes = require('./routes/main.route');
const characterRoutes = require('./routes/character.route');

// database connection
const dbo = require('./db/conn');

dbo.connectToServer((err) => {
  if (err) console.error(err);
});

// routes
app.use('/', mainRoutes);
app.use('/api/character/', characterRoutes);

// start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// export app
module.exports = app;
