const express = require('express');
const homeRoute = express.Router();
const passwords = require('../models/password');

homeRoute.get('/', async (req, res) => {
    res.render('homepage', { passwordData: null });  // Initially, no data to display
});

homeRoute.get('/search', async (req, res) => {
    const query = req.query.website;
    const passwordData = await passwords.findOne({ website: query });
    console.log(passwordData);
    
    res.render('homepage', { passwordData });  // Pass the search result to the template
});

module.exports = homeRoute;
