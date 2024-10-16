const express = require('express');
const homeRoute = express.Router();
const Password = require('../models/password');

// Route to render homepage with all passwords
homeRoute.get('/', async (req, res) => {
    try {
        const data = await Password.find({});
        res.render('homepage', { passwordData: null, data });  
    } catch (error) {
        res.status(500).send(`Error retrieving data ${error}`);
    }
});

// Route to search for password by website
homeRoute.get('/search', async (req, res) => {
    try {
        const query = req.query.website;
        const passwordData = await Password.findOne({ website: query });
        res.render('homepage', { passwordData, data: [] }); 
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

module.exports = homeRoute;
