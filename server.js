const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
// const TestModel = require('./models/schema');
const Starters = require('./models/Starters');
const Reserves = require('./models/Reserves');
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

app.set('view engine', 'ejs');
// Static folder
app.use(express.static('public'));
// Body Parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());


app.get('/', async (req, res) => {
  try {
    const startingFive = await Starters.find({});
    const reserves = await Reserves.find({});
    console.log(startingFive);
    console.log(reserves);
    res.render('index.ejs', {starters: startingFive, rest: reserves});
  } catch(err) {
    res.status(500).send({message: err.message});
  } 
})

// Routes
app.use('/add', require('./routes/add'));



app.listen(process.env.PORT || PORT, () => {
  console.log('Server is running');
})