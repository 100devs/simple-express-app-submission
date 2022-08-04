console.log("May the node be with you")

const PORT = 9000
const cors = require("cors")

const express = require("express");
const parser = require("body-parser");
//const { response } = require("express");
const app = express()
const MongoClient = require ('mongodb').MongoClient
const connectionString = "mongodb+srv://admin:admin@cluster0.49ivm.mongodb.net/?retryWrites=true&w=majority"

// making a data object with starwars characters to try to use as responses for api calls from the index.html

app.use(parser.urlencoded({ extended: true}))
app.use(express.static('public'))
app.use(parser.json())
app.use(cors())

const jedis = {
  'yoda master':{
    'age': 999,
    'birthname': 'dill pickel', 
    'location': 'jungle planet with lots of stuff and unhealthy amount of greenery and swamps',
    'speciality': 'speaking out of sequence, in riddles, and when not required', 
    'profession': 'being a master of all jedis, being cute when young and cause more harm then good'
  },
  'star killer':{
    'age': 24,
    'birthname': 'methew neymar myers', 
    'location': 'moon 34 of the planet oogra, which was destroyed long ago',
    'speciality': 'bringing raw young angry energy and then failing to use it to cause benifits however causing lots of destruction', 
    'profession': 'child in rebel phase'
  },
  'obi 1':{
    'age': 33,
    'birthname': 'clone one of obiwan kenobi, general to the armys of north, true follower of commander general yoda', 
    'location': 'some desert planet not remotely looking like tatooine',
    'speciality': 'humble watcher, who looks good doing anything, nothing but not really while near any farmable lifeform', 
    'profession': 'do gooder and dier'
  },
  'luke skywalker':{
    'age': 16,
    'birthname': 'jedi youngling who was spared', 
    'location': 'some desert planet not remotely resembling tatooine',
    'speciality': 'asking questions, making irrational decisions, getting in harms way and screaming no really really loud', 
    'profession': 'pouty lip hero who will win just because'
  },
  'deceased jedi/youngling':{
    'age': '4 to 1999',
    'birthname': 'they are dead, people who knew them died, lets just call them... joe', 
    'location': 'underground, with ashes in ashes, at the ocean floors being part of nature and in air with ... well, you get it, right? ',
    'speciality': 'making some whiney jedi kid turning to darker grey side look cool', 
    'profession': 'heroes'
  }
}







app.set ('view engine', 'ejs')

//  app.get('/', (req, res)=>{
// //   //res.send('Hello desu')
//    console.log(__dirname)
//    res.sendFile(__dirname + '/index.html')
//  })

//app.post('/quotes', (req, res)=> {
//  console.log('hellooww there posted requesting friend')
//  console.log(req.body)
//})



MongoClient.connect(connectionString, { useUnifiedTopology: true })
.then(client => {
  console.log('Connected to the star wars db')

  const db = client.db('star-wars-qoutes')
  const quotesCollection = db.collection('quotes')

  app.listen(process.env.PORT || PORT, function(){
    console.log(`listening 3000 or ${process.env.PORT}`);
  })
  
  app.get('/', (req, res) => {
    db.collection('quotes').find().toArray()
      .then(results => {
        console.log(results)
        res.render('index.ejs',{ quotes: results })

      })
      .catch(error => console.error(error))
    // ...
  })
  app.post('/quotes', (req, res)=> {
    console.log(req.body)
    quotesCollection.insertOne(req.body)
    .then(result=> {
      console.log(result)
      res.redirect('/')
    }) 
    .catch(error=> console.error(error))
  })
  app.put ('/quotes', (req, res) => {
    console.log(req.body)

    quotesCollection.findOneAndUpdate(
      { name: 'Yoda' },
      {
        $set: {
          name: req.body.name,
          quote: req.body.quote
        }
      },
      {
        upsert: true
      }
    )
      .then(result => {
        console.log(req.body)
        res.json('Success')
      })
      .catch(error => console.error(error))


  })
  app.delete('/quotes', (req, res) => {
    console.log(req.body)

    quotesCollection.deleteOne(
      {name: req.body.name}
    )
    .then(result=> {
      if (result.deletedCount === 0){
        return res.json('No quote to delete')
      }
      res.json("Deleted Dathvader's quote")
    })
    .catch(error=> console.error(error))
  })
  app.get('/api/:jediName', (req, res) => {
    const jedisName = req.params.jediName
    if(jedis[jedisName]){
      res.json(jedis[jedisName])
    }else{
      res.json(jedis['deceased jedi/youngling'])
    }
  })

})
.catch(error => console.error(error))