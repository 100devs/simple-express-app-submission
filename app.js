const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require ('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash')
const cors = require('cors')


const app = express()
const port = process.env.PORT || 3000

require('dotenv').config();

app.use(express.urlencoded( {extended: true} ))
app.use(express.static('public'));
app.use(expressLayouts);
app.use(cors())

app.use(cookieParser('HotelAppSecure'));
app.use(session({
    secret: "HotelAppSecretSession",
    saveUninitialized: true,
    resave: true
}));
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})
app.use(flash());
app.use(fileUpload());

app.set('layout', './layouts/main');
app.set('view engine','ejs' )

const routes = require('./server/routes/hotelRoutes.js')
app.use('/', routes);

app.listen(port, () => console.log(`Listening to port ${port}`))
