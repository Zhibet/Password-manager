const express = require('express');
const createRoute = express.Router();
const Password = require('../models/password');
const auth = require('../auth');

createRoute.post('/create', auth, async (req, res) => {
    const { website, username, password } = req.body; 

    try {
        const newPassword = new Password({ website, username, password });
        await newPassword.save();
        return res.status(201).json({ message: 'Password added successfully', password: newPassword });
    } catch (error) {
        return res.status(500).json({ 
            error: 'Failed to add password', 
            details: error.message 
        });
    }
});

module.exports = createRoute; 