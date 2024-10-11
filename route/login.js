const express = require('express');
const passport = require('passport');
const loginRoute = express.Router();
const User = require('../models/user'); // Ensure correct import for your User model
const jwt = require('jsonwebtoken');

loginRoute.get('/login', async (req, res) => {
    res.render('loginpage');
});

loginRoute.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login'); // Redirect if authentication fails
        }
        
        // Log the user in
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            // Generate token only after successful login
            const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1h' });

            // Set token as a cookie
            res.cookie('token', token, {
                httpOnly: true, // Prevents JavaScript from accessing the cookie
                secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
                maxAge: 3600000 // 1 hour
            });

            const redirectUrl = req.session.returnTo || '/';
            delete req.session.returnTo; 
            return res.redirect(redirectUrl); // Redirect to the original destination
        });
    })(req, res, next);
});

module.exports = loginRoute;
