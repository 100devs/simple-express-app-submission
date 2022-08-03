require('dotenv').config();
const express = require('express');
const { urlencoded } = express;
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT;
const workoutRoutes = require('./routes/workouts');

// MIDDLEWARE

app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// ROUTES
app.use('/api/workouts', workoutRoutes);

// Connect to DB
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('Connected to the DB');
		// Listen for requests
		app.listen(PORT || 8000, () => {
			console.log(`Listening on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
