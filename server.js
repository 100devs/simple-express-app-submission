const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
// const TestModel = require('./models/schema');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_STRING, 
      {useNewUrlParser: true});
    console.log(`Connected to Database: ${mongoose.connection.name}`);
  } catch(err) {
    console.log('Failed to connect', err);
  }
}

connectDB();