var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const catalogRouter = require(`./routes/catalog`);
const dotenv = require('dotenv').config();
const compression = require('compression');
const helmet = require('helmet');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(helmet());
app.use(compression()) //Compress all routes
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(`/catalog`, catalogRouter); //Add catalog routes to the middleware chain


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


//Set up default mongoose connection
mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_CONNECTION_STRING, {useNewURLParser: true, useUnifiedTopology: true});

//Get the default connection
// You can get the default Connection object with mongoose.connection. Once connected, the open event is fired on the Connection instance.
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error'))
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
