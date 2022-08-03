const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 2000;
require('dotenv').config();

// ========================
// Link to Database
// ========================

let db,
	dbConnectionStr = process.env.DB_STRING,
	dbName = 'counting-cows';

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
	client => {
		console.log(`Connected to ${dbName} Database`);
		db = client.db(dbName);
	});

// ======================== 
// Middlewares
// ========================
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('favicon'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ========================
// Routes
// ========================
app.get('/', (request, response) => {
	db.collection('players')
		.find()
		.sort({ 'farmTotal': -1 })
		.toArray()
		.then(player => {
			response.render('index.ejs', { players: player });
		})
		.catch(error => console.error(error));
})


// ========================
// Create New Player
// ========================

app.post('/addPlayer', (request, response) => {
	db.collection('players')
		.insertOne({
			playerName: request.body.playerName,
			farmName: request.body.farmName,
			farmTotal: 0,
			grazingCount: 0,
			farmCows: 0,
			farmSheep: 0,
			farmHorses: 0,
			farmGoats: 0,
			farmOther: 0,
			barnCount: 0,
			barnCows: 0,
			barnSheep: 0,
			barnHorses: 0,
			barnGoats: 0,
			barnOther: 0,
		})
		.then(result => {
			console.log(`Player added`)
			response.redirect('/');
		})
		.catch(error => console.error(error));
});

// ========================
// BY NUMBER
// ========================

app.put('/byNumber', (request, response) => {

	db.collection('players').findOne({ playerName: request.body.playerNameS })
		.then(player => {
			const animal = request.body.animalS
			const grazingCount = player.farmCows + player.farmSheep + player.farmHorses + player.farmGoats + player.farmOther
			const barnCount = player.barnCows + player.barnSheep + player.barnHorses + player.barnGoats + player.barnOther
			const farmTotal = grazingCount + barnCount

			switch (animal) {
				case 'Cows':
					db.collection('players').updateOne({ playerName: request.body.playerNameS }, {
						$set: {
							farmCows: player.farmCows + request.body.numberS,
							grazingCount: grazingCount + request.body.numberS,
							farmTotal: farmTotal + request.body.numberS,
						}
					})
						.then(result => {
							console.log('byNumber Success')
							response.json('byNumber Success')
						})
						.catch(error => console.error(error))
					break;
				case 'Sheep':
					db.collection('players').updateOne({ playerName: request.body.playerNameS }, {
						$set: {
							farmSheep: player.farmSheep + request.body.numberS,
							grazingCount: grazingCount + request.body.numberS,
							farmTotal: farmTotal + request.body.numberS,
						}
					})
						.then(result => {
							console.log('byNumber Success')
							response.json('byNumber Success')
						})
						.catch(error => console.error(error))
					break;
				case 'Horses':
					db.collection('players').updateOne({ playerName: request.body.playerNameS }, {
						$set: {
							farmHorses: player.farmHorses + request.body.numberS,
							grazingCount: grazingCount + request.body.numberS,
							farmTotal: farmTotal + request.body.numberS,
						}
					})
						.then(result => {
							console.log('byNumber Success')
							response.json('byNumber Success')
						})
						.catch(error => console.error(error))
					break;
				case 'Goats':
					db.collection('players').updateOne({ playerName: request.body.playerNameS }, {
						$set: {
							farmGoats: player.farmGoats + request.body.numberS,
							grazingCount: grazingCount + request.body.numberS,
							farmTotal: farmTotal + request.body.numberS,
						}
					})
						.then(result => {
							console.log('byNumber Success')
							response.json('byNumber Success')
						})
						.catch(error => console.error(error))
					break;
				case 'Other':
					db.collection('players').updateOne({ playerName: request.body.playerNameS }, {
						$set: {
							farmOther: player.farmOther + request.body.numberS,
							grazingCount: grazingCount + request.body.numberS,
							farmTotal: farmTotal + request.body.numberS,
						}
					})
						.then(result => {
							console.log('byNumber Success')
							response.json('byNumber Success')
						})
						.catch(error => console.error(error))
					break;
			}

		})
		.catch(error => console.error(error))

})

// ========================
// BARN
// ========================


app.put('/barn', (request, response) => {

	db.collection('players').findOne({ playerName: request.body.playerNameS })
		.then(player => {
			const animal = request.body.animalS
			const grazingCount = player.farmCows + player.farmSheep + player.farmHorses + player.farmGoats + player.farmOther
			const barnCount = player.barnCows + player.barnSheep + player.barnHorses + player.barnGoats + player.barnOther
			const farmTotal = grazingCount + barnCount

			switch (animal) {
				case 'Cows':
					db.collection('players').updateOne({ playerName: request.body.playerNameS }, {
						$set: {
							barnCows: player.barnCows + player.farmCows,
							farmCows: 0,
							barnCount: barnCount + player.farmCows,
							grazingCount: grazingCount - player.farmCows
						}
					})
						.then(result => {
							console.log(`Stored ${player.playerName}'s ${animal} in the Barn`)
							response.json(`Stored ${player.playerName}'s ${animal} in the Barn`)
						})
						.catch(error => console.error(error))
					break;
				case 'Sheep':
					db.collection('players').updateOne({ playerName: request.body.playerNameS }, {
						$set: {
							barnSheep: player.barnSheep + player.farmSheep,
							farmSheep: 0,
							barnCount: barnCount + player.farmSheep,
							grazingCount: grazingCount - player.farmSheep
						}
					})
						.then(result => {
							console.log(`Stored ${player.playerName}'s ${animal} in the Barn`)
							response.json(`Stored ${player.playerName}'s ${animal} in the Barn`)
						})
						.catch(error => console.error(error))
					break;
				case 'Horses':
					db.collection('players').updateOne({ playerName: request.body.playerNameS }, {
						$set: {
							barnHorses: player.barnHorses + player.farmHorses,
							farmHorses: 0,
							barnCount: barnCount + player.farmHorses,
							grazingCount: grazingCount - player.farmHorses
						}
					})
						.then(result => {
							console.log(`Stored ${player.playerName}'s ${animal} in the Barn`)
							response.json(`Stored ${player.playerName}'s ${animal} in the Barn`)
						})
						.catch(error => console.error(error))
					break;
				case 'Goats':
					db.collection('players').updateOne({ playerName: request.body.playerNameS }, {
						$set: {
							barnGoats: player.barnGoats + player.farmGoats,
							farmGoats: 0,
							barnCount: barnCount + player.farmGoats,
							grazingCount: grazingCount - player.farmGoats
						}
					})
						.then(result => {
							console.log(`Stored ${player.playerName}'s ${animal} in the Barn`)
							response.json(`Stored ${player.playerName}'s ${animal} in the Barn`)
						})
						.catch(error => console.error(error))
					break;
				case 'Other':
					db.collection('players').updateOne({ playerName: request.body.playerNameS }, {
						$set: {
							barnOther: player.barnOther + player.farmOther,
							farmOther: 0,
							barnCount: barnCount + player.farmOther,
							grazingCount: grazingCount - player.farmOther
						}
					})
						.then(result => {
							console.log(`Stored ${player.playerName}'s ${animal} in the Barn`)
							response.json(`Stored ${player.playerName}'s ${animal} in the Barn`)
						})
						.catch(error => console.error(error))
					break;
			}

		})
		.catch(error => console.error(error))
})

// ========================
// MARRY
// ========================

app.put('/marry', (request, response) => {

	db.collection('players').findOne({ playerName: request.body.playerNameS })
		.then(player => {
			const animal = request.body.animalS
			const grazingCount = player.farmCows + player.farmSheep + player.farmHorses + player.farmGoats + player.farmOther
			const barnCount = player.barnCows + player.barnSheep + player.barnHorses + player.barnGoats + player.barnOther
			const farmTotal = grazingCount + barnCount

			switch (animal) {
				case 'Cows':
					db.collection('players').updateOne({ playerName: request.body.playerNameS }, {
						$set: {
							farmCows: player.farmCows * 2,
							grazingCount: (player.farmCows * 2) + player.farmSheep + player.farmHorses + player.farmGoats + player.farmOther,
							farmTotal: farmTotal + player.farmCows,
						}
					})
						.then(result => {
							console.log(`Married ${player.playerName}'s ${animal}`)
							response.json(`Married ${player.playerName}'s ${animal}`)
						})
						.catch(error => console.error(error))
					break;
				case 'Sheep':
					db.collection('players').updateOne({ playerName: request.body.playerNameS }, {
						$set: {
							farmSheep: player.farmSheep * 2,
							grazingCount: player.farmCows + (player.farmSheep * 2) + player.farmHorses + player.farmGoats + player.farmOther,
							farmTotal: farmTotal + player.farmSheep,
						}
					})
						.then(result => {
							console.log(`Married ${player.playerName}'s ${animal}`)
							response.json(`Married ${player.playerName}'s ${animal}`)
						})
						.catch(error => console.error(error))
					break;
				case 'Horses':
					db.collection('players').updateOne({ playerName: request.body.playerNameS }, {
						$set: {
							farmHorses: player.farmHorses * 2,
							grazingCount: player.farmCows + player.farmSheep + (player.farmHorses * 2) + player.farmGoats + player.farmOther,
							farmTotal: farmTotal + player.farmHorses,
						}
					})
						.then(result => {
							console.log(`Married ${player.playerName}'s ${animal}`)
							response.json(`Married ${player.playerName}'s ${animal}`)
						})
						.catch(error => console.error(error))
					break;
				case 'Goats':
					db.collection('players').updateOne({ playerName: request.body.playerNameS }, {
						$set: {
							farmGoats: player.farmGoats * 2,
							grazingCount: player.farmCows + player.farmSheep + player.farmHorses + (player.farmGoats * 2) + player.farmOther,
							farmTotal: farmTotal + player.farmGoats,
						}
					})
						.then(result => {
							console.log(`Married ${player.playerName}'s ${animal}`)
							response.json(`Married ${player.playerName}'s ${animal}`)
						})
						.catch(error => console.error(error))
					break;
				case 'Other':
					db.collection('players').updateOne({ playerName: request.body.playerNameS }, {
						$set: {
							farmOther: player.farmOther * 2,
							grazingCount: player.farmCows + player.farmSheep + player.farmHorses + player.farmGoats + (player.farmOther * 2),
							farmTotal: farmTotal + player.farmOther,
						}
					})
						.then(result => {
							console.log(`Married ${player.playerName}'s ${animal}`)
							response.json(`Married ${player.playerName}'s ${animal}`)
						})
						.catch(error => console.error(error))
					break;
			}

		})
		.catch(error => console.error(error))
})
// ========================
// KILL
// ========================

app.put('/kill', (request, response) => {

	db.collection('players').findOne({ playerName: request.body.playerNameS })
		.then(player => {
			const animal = request.body.animalS
			const grazingCount = player.farmCows + player.farmSheep + player.farmHorses + player.farmGoats + player.farmOther
			const barnCount = player.barnCows + player.barnSheep + player.barnHorses + player.barnGoats + player.barnOther
			const farmTotal = grazingCount + barnCount

			switch (animal) {
				case 'Cows':
					db.collection('players').updateOne({ playerName: request.body.playerNameS }, {
						$set: {
							farmCows: 0,
							grazingCount: grazingCount - player.farmCows,
							farmTotal: farmTotal - player.farmCows,
						}
					})
						.then(result => {
							console.log(`Killed ${player.playerName}'s ${animal}`)
							response.json(`Killed ${player.playerName}'s ${animal}`)
						})
						.catch(error => console.error(error))
					break;
				case 'Sheep':
					db.collection('players').updateOne({ playerName: request.body.playerNameS }, {
						$set: {
							farmSheep: 0,
							grazingCount: grazingCount - player.farmSheep,
							farmTotal: farmTotal - player.farmSheep,
						}
					})
						.then(result => {
							console.log(`Killed ${player.playerName}'s ${animal}`)
							response.json(`Killed ${player.playerName}'s ${animal}`)
						})
						.catch(error => console.error(error))
					break;
				case 'Horses':
					db.collection('players').updateOne({ playerName: request.body.playerNameS }, {
						$set: {
							farmHorses: 0,
							grazingCount: grazingCount - player.farmHorses,
							farmTotal: farmTotal - player.farmHorses,
						}
					})
						.then(result => {
							console.log(`Killed ${player.playerName}'s ${animal}`)
							response.json(`Killed ${player.playerName}'s ${animal}`)
						})
						.catch(error => console.error(error))
					break;
				case 'Goats':
					db.collection('players').updateOne({ playerName: request.body.playerNameS }, {
						$set: {
							farmGoats: 0,
							grazingCount: grazingCount - player.farmGoats,
							farmTotal: farmTotal - player.farmGoats,
						}
					})
						.then(result => {
							console.log(`Killed ${player.playerName}'s ${animal}`)
							response.json(`Killed ${player.playerName}'s ${animal}`)
						})
						.catch(error => console.error(error))
					break;
				case 'Other':
					db.collection('players').updateOne({ playerName: request.body.playerNameS }, {
						$set: {
							farmOther: 0,
							grazingCount: grazingCount - player.farmOther,
							farmTotal: farmTotal - player.farmOther,
						}
					})
						.then(result => {
							console.log(`Killed ${player.playerName}'s ${animal}`)
							response.json(`Killed ${player.playerName}'s ${animal}`)
						})
						.catch(error => console.error(error))
					break;
			}

		})
		.catch(error => console.error(error))
})

// ========================
// Delete
// ========================

app.delete('/deletePlayer', (request, response) => {
	db.collection('players')
		.deleteOne({
			playerName: request.body.playerNameS,
			farmName: request.body.farmNameS,
		})
		.then(result => {
			console.log(`Player: ${request.body.playerNameS}, Deleted`);
			response.json(`Player: ${request.body.playerNameS}, Deleted`);
		})
		.catch(error => console.error(error));
});

// ========================
// Listen
// ========================

app.listen(process.env.PORT || PORT, function () {
	console.log(`listening on ${PORT}`);
});
