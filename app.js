const express = require('express');
const mongoose = require('mongoose');
const homeRoute = require('./route/home');
const loginRoute = require('./route/login');
const logoutRoute = require('./route/logout'); // Import the logout route
const ejs = require('ejs');
const engine = require('ejs-mate');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const User = require('./models/user'); 
const passport = require('passport');
const createRoute = require('./route/create'); 
const LocalStrategy = require('passport-local').Strategy;

const app = express(); 

mongoose.connect('mongodb://127.0.0.1:27017/password-manager')
    .then(() => { console.log('The database is live'); })
    .catch(err => console.error('Database connection error:', err));

// Middleware to reset session expiration
const resetSessionTimer = (req, res, next) => {
    if (req.isAuthenticated()) {
        req.session.lastActivity = Date.now(); // Track last activity time
    }
    next();
};

// Middleware for automatic logout
const autoLogout = (req, res, next) => {
    if (req.isAuthenticated() && req.session.lastActivity) {
        const now = Date.now();
        const inactivityTime = now - req.session.lastActivity;

        if (inactivityTime > 5 * 60 * 1000) { // 5 minutes
            return req.logout(err => {
                req.session.destroy(err => {
                    if (err) {
                        return next(err);
                    }
                    res.clearCookie('token');
                    return res.redirect('/login'); // Redirect to login page
                });
            });
        }
    }
    next();
};

app.use(express.static('public'));
app.engine('ejs', engine);
app.set('views', `${__dirname}/views`); 
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.use(resetSessionTimer);
app.use(autoLogout);

// Routes
app.use('/', homeRoute); 
app.use('/', loginRoute);
app.use('/', logoutRoute); 
app.use('/', createRoute); 

// Starting the server
const port = 3000;
app.listen(port, () => {
    console.log(`The app is live on http://localhost:${port}`); 
});