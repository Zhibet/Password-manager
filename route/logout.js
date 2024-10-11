const express = require('express');
const logoutRoute = express.Router();

logoutRoute.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err); 
        }
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.clearCookie('token'); // Clear the JWT cookie if you're using one
            res.redirect('/'); // Redirect to home or login page
        });
    });
});

module.exports = logoutRoute;
