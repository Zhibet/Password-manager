const express = require('express');
const passport = require('passport');
const loginRoute = express.Router();
const user = require('../models/user');

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
            const redirectUrl = req.session.returnTo || '/';
            delete req.session.returnTo; 
            return res.redirect(redirectUrl);
        });
    })(req, res, next);
});

module.exports = loginRoute;
