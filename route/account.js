const express = require('express');
const auth = require('../auth');
const accountRoute = express.Router();
const protect = require('../protect')

accountRoute.get('/account',protect,(req,res)=>{
    const user = req.session.passport.user;
    const accountData = {
        user,
    }
    res.render('accountPage',{accountData})
});

module.exports = accountRoute;