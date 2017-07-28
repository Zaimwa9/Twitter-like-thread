var express = require('express');
var app = express();

//controllers
var mainController = require('./controllers/mainController.js');
var bodyParser = require('body-parser')
//middlewares

//db
var mongoose = require('mongoose');
var config = require('./config/index.js');

var port = 3012;


var db = mongoose.connect(config.getDbConnectionstring(), function() {
    console.log('successfully connected')
});


app.use(bodyParser({extended: true}));


//app.set('view engine', 'ejs');

app.get('/test', (req, res) => console.log('testing'));

// Sending requests to the mainController that will handle them
mainController(app);

app.listen(port);