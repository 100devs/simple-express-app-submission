const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8000;
require('dotenv').config()
const Aquarium = require('./model/Aquarium');


let db,     //adding db variables, especially DB_STRING which is found in .env to connect to mongo
    dbName = 'shareAquarium'

mongoose.connect(process.env.DB_STRING, { useUnifiedTopology: true })  //connecting to db
    .then(client => {
        console.log(`Connected to ${dbName} Database`);
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.get('/:id?', async (req, res)=> {
  let aquariums;
  if (req.params.id === 'old') {
    aquariums = await Aquarium.find().sort({dateCreated: 'asc'}).lean();
    res.render('index.ejs', { aquariums: aquariums });
  }
  else if (req.params.id === 'new') {
    aquariums = await Aquarium.find().sort({dateCreated: 'desc'}).lean();
    res.render('index.ejs', { aquariums: aquariums });
  }
  else if (req.params.id === 'liked') {
    aquariums = await Aquarium.find().sort({likes: 'desc'}).lean();
    res.render('index.ejs', { aquariums: aquariums });
  }
  else if (req.params.id === 'inspiring') {
    aquariums = await Aquarium.find().sort({inspired: 'desc'}).lean();
    res.render('index.ejs', { aquariums: aquariums });
  }
  else if (req.params.id === 'size-big') {
    aquariums = await Aquarium.find().sort({trueSize: 'desc'}).lean();
    res.render('index.ejs', { aquariums: aquariums });
  }
  else if (req.params.id === 'size-small') {
    aquariums = await Aquarium.find().sort({trueSize: 'asc'}).lean();
    res.render('index.ejs', { aquariums: aquariums });
  }
  else {
    aquariums = await Aquarium.find().sort({dateCreated: 'desc'}).lean();
    res.render('index.ejs', {aquariums: aquariums});
  }
})


//liking a post
app.put('/addLike', async (req, res)=> {
  try {
    const aquarium = await Aquarium.findOne({_id:req.body.itemID}).lean();
    let numberOfLikes = aquarium.likes + 1;
    await Aquarium.findOneAndUpdate({_id:req.body.itemID},{
      likes: numberOfLikes
    })
    res.json('Added Like');
  }
  catch(err) {
    console.error(err);
  }
})

//inspired by a post
app.put('/addInspired', async (req, res)=> {
  try {
    const aquarium = await Aquarium.findOne({_id:req.body.itemID}).lean();
    let numberOfInspired = aquarium.inspired + 1;
    await Aquarium.findOneAndUpdate({_id:req.body.itemID},{
      inspired: numberOfInspired
    })
    res.json('Added Like');
  }
  catch(err) {
    console.error(err);
  }
})


app.post('/shareAquarium', async (req, res)=> {
  try {
    let tankSize;
    let measurementType;
    let trueSize;
    let gallonsToLiters = Number(req.body.quantity[0]) * 3.78541;
    let liters = Number(req.body.quantity[1]);
    if (gallonsToLiters >= liters) {
      tankSize = Number(req.body.quantity[0]);
      measurementType = 'gallons';
      trueSize = Number(req.body.quantity[0]) * 3.78541;
    }
    else {
      tankSize = Number(req.body.quantity[1]);
      measurementType = 'liters';
      trueSize = Number(req.body.quantity[1]);
    }
    const aquarium = await Aquarium.create({
      name: req.body.fname,
      waterType: req.body.waterType,
      tankSize: tankSize,
      trueSize: trueSize,
      measurementType: measurementType,
      images: req.body.myFile,
      description: req.body.description,
      fish: req.body.fish,
      likes: 0,
      inspired: 0,
    });
    res.redirect('/');
  } catch (err) {
    console.error(err)
  }
})




app.listen(PORT, ()=> {
  console.log(`Server is running on port ${PORT}`);
})
