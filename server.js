const express = require('express');
const app = express();
const cors = require('cors')
// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
// const WorkOrder = require('./models/workOrder');
const pusher = require('./routes/pusher')
const PORT = 8000;
require('dotenv').config();

let workOrderDb,
    modMachInfoDB,
    dbConnectionStr = 'mongodb+srv://drader2:KodaDash1@cluster0.ugc78.mongodb.net/workOrders';

mongoose.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected To Database');
    })
    .catch(error => console.error(error));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

// app.get('/user', (req, res) => {
//     console.log('success')
//     res.render('user.ejs')
// });

//routes
app.use('/submitWO', pusher);
app.use('/', require('./routes/index'));
app.use('/workOrders', require('./routes/workOrders'));
// app.use('/workOrders', require('./routes/workOrders'));
app.use('/user', require('./routes/user'));
app.use('/account', require('./routes/account'));

app.listen(process.env.PORT || PORT, (req, res) => {
    console.log(`Running server on port ${PORT}`);
});


