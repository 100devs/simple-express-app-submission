import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'

const PORT = process.env.PORT || 8000
const app = express()

const client = await getMongoClient()

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/', (req, res) => {
  client.db('quotes')
    .collection('quotes')
    .aggregate([{ $sample: { size: 1 }}])
    .toArray()
	.then((quotes) => {
    quotes = quotes.map(({_id, ...quote}) => quote)
    res.render('index.ejs', {quotes: quotes})
  })
  .catch((e => console.log(e)))
})

app.get('/api', (req, res) => {
  let { searchText } = req.query
  searchText = searchText.replace(/[ ]/, '([ ]|<br />)')
  client.db('quotes').collection('quotes')
    .find({ line: { $regex: `${searchText}`, $options: 'i' } } )
    .toArray()
	.then((quotes) => {
    quotes = quotes.map(({_id, ...quote}) => quote)
    res.render('index.ejs', {quotes: quotes})
  })
})

client
  .connect()
  .then(() => {
    console.log(`connected to mongodb`)
    app.listen(PORT, () => {
      console.log(`listening on port: ${PORT}`)
    })
  })

async function getMongoClient() {
   let MONGODB_URL = process.env.MONGODB_URL;
  if (!MONGODB_URL) throw new Error('MONGODB_URL environment variable is required')
  return await new MongoClient(MONGODB_URL);
}

