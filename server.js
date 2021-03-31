const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT;
const CONNECTIONSTRING = process.env.MONGODB_URI;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cors());

app.set('view engine', 'ejs');

// Start server
app.listen(PORT, function() {
	console.log(`listening on port ${PORT}`);
});


MongoClient.connect(CONNECTIONSTRING,	{useUnifiedTopology: true},	(err, client) => {
	if(err) {
		return console.error(err);
	}

	const db = client.db('simple-express-app-homework');
	const filmsCollection = db.collection('films');

	// GET
	app.get('/', function(_, res) {
		filmsCollection
		.find()
		.toArray()
		.then(filmsData => {
			res.render('index.ejs', {films: filmsData});
		})
		.catch(error => {
			console.error(error);
			res.sendFile(path.join(__dirname, 'public/404.html'));
		})
	});

	// POST
	app.post('/api/addfilm', (req, res) => {
		filmsCollection.insertOne(req.body)
		.then(() => {
			res.redirect('/');
		})
		.catch(err => console.error(err));
	});

	// DELETE
	app.delete('/api/deletefilm', (req, res) => {
		filmsCollection.deleteOne(
			{ film: req.body.film }
		)
		.then(result => {
			if (result.deletedCount === 0) {
				return res.json('Film not found on server');
			}
			else {
				return res.json(`Deleted ${req.body.film}`);
			}
		})
		.catch(error => console.error(error))
	})
});