//server.js
console.log('Time to shop!')

const express = require('express');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const path = require("path");
const connectDB = require('./server/database/connect');
const app = express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT||8080

//log requests
app.use(morgan('tiny'))

//mongodb connection
connectDB();

//pass request to body-parser
app.use(bodyparser.urlencoded({ extended : true }))

//set view engine
app.set("view engine", "ejs")

//load assets
app.use('/CSS', express.static(path.resolve(__dirname, "assets/CSS")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

//load routes

app.use('/',require('./server/routes/router'))


app.listen(PORT, ()=> {console.log(`Server is listening on http://localhost:${PORT}`)});