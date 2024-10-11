const express = require('express');
const mongoose = require('mongoose');
const homeRoute = require('./route/home');
const loginRoute = require('./route/login')
const ejs = require('ejs');
const engine = require('ejs-mate');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const User = require('./models/user'); 
const passport = require('passport');
const logout = require('./route/logout');
const LocalStrategy = require('passport-local').Strategy;

const app = express(); 

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/password-manager')
    .then(() => { console.log('The database is live'); })
    .catch(err => console.error('Database connection error:', err));

// Static files and view engine configuration
app.use(express.static('public'));
app.engine('ejs', engine);
app.set('views', `${__dirname}/views`); 
app.set('view engine', 'ejs');

// Body-parser configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Session configuration
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
        mongoUrl: 'mongodb://127.0.0.1:27017/password-manager',
        ttl: 5 * 60 // Session lasts 5 minutes (5 minutes * 60 seconds)
    }),
    cookie: { 
        maxAge: 5 * 60 * 1000 // 5 minutes session duration
    }
}));

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.SignedIn = req.user; 
    next();
});

// Routes
app.use('/', homeRoute); 
app.use('/',loginRoute)
app.use('/',logout)

// Starting the server
const port = 3000;
app.listen(port, () => {
    console.log(`The app is live on http://localhost:${port}`); 
});
