const express = require("express")
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.set('view engine', 'ejs')

const PORT = process.env.PORT || 8000
const connectionString = process.env.CONNECTION_STRING

MongoClient.connect(connectionString)
	.then(client => {
		console.log("connected to db")
		const db = client.db('star-wars-quotes')
		const quotesCollection = db.collection('quotes')

		app.get("/", (req, res) => {
			db.collection("quotes").find().toArray()
				.then(results => {
					res.render('index.ejs', { quotes: results })
				})
				.catch(error => console.error(error))
		})

		app.post("/quotes", (req, res) => {
			quotesCollection.insertOne(req.body)
				.then(result => {
					res.redirect("/")
				})
				.catch(error => console.error(error))
		})
		app.put("/quotes", (req, res) => {
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
					res.json("success")
				})
				.catch(error => console.error(error))
		})

		app.delete("/quotes", (req, res) => {
			quotesCollection.deleteOne(
				{ name: req.body.name },
			)
				.then(result => {
					res.json(`Deleted Darth Vader's quote`)
				})
				.catch(error => console.error(error))
		})

		app.listen(PORT, () => {
			console.log(`listening on port ${PORT}`)
		})
	})
	.catch(console.error)

