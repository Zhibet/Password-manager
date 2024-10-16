const express = require('express');
const passport = require('passport');
const loginRoute = express.Router();
const User = require('../models/user'); 
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
            return res.redirect('/login'); 
        }
        
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            const token = jwt.sign({ id: user._id }, process.env.secretKey, { expiresIn: '1h' });

            // Set token as a cookie
            res.cookie('token', token, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production', 
                maxAge: 3600000 // 1 hour
            });

            req.session.AuthToken = token;

            const redirectUrl = req.session.returnTo || '/';
            delete req.session.returnTo; 
            return res.redirect(redirectUrl);
        });
    })(req, res, next);
});

module.exports = loginRoute;
