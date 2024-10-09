const express = require('express');
const mongoose = require('mongoose');
const homeRoute = require('./route/home');
const ejs = require('ejs');
const engine = require('ejs-mate');
const app = express();
var bodyParser = require('body-parser')


mongoose.connect('mongodb://127.0.0.1:27017/password-manager')
    .then(() => { console.log('the database is live'); });

app.use(express.static('public'));
app.engine('ejs', engine);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/', homeRoute);

const port = 3000;
app.listen(port, () => {
    console.log(`the app is live on ${port}`);
});