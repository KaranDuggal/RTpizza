require('dotenv').config()
const path = require('path');
const flash = require('express-flash');
const session = require('express-session');
const mongoDbStore = require('connect-mongo')(session);
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const express = require('express');
const passport = require('passport'); 
const app = express();
const PORT = process.env.PORT || 8000;
// ==== connect to Databass ====
const mongoose = require('mongoose');
const URL_DB = 'mongodb://localhost/Pizza';
mongoose.connect(URL_DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('database connected...');
}).catch(err => {
    console.log('connection Failed...');
});
// ==== Paths ====
const viewsPath = path.join(__dirname, '../resources/views');
const staticPath = path.join(__dirname, '../public');
const routesPath = path.join(__dirname, '../routes/web');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// console.log(viewsPath);

// ==== middelwear ====
app.use(flash());

// ==== Session Store ====
let mongoStore = new mongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
});


// ==== Session config ====
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } //24 hours
}));

// passport config 
const passportInit = require('../app/config/passport');
passportInit(passport)
app.use(passport.initialize());
app.use(passport.session())


// ==== set templates engine ====
app.set('view engine', 'ejs');
app.set('views', viewsPath);
app.use(expressLayout);
app.use(express.static(staticPath));
// ==== globalmiddalWare ====
app.use((req,res,next)=>{
    res.locals.session = req.session
    res.locals.user = req.user
    next()
});


// ==== routes ====
require(routesPath)(app)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});