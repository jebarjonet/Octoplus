var express = require('express');
var path = require('path');
var http = require('http');
var fs = require('fs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');
var parameters = require('./config/parameters');
var router = express.Router();

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost/octoplus');

// loading models
var modelDir = path.join(__dirname, './models');
fs.readdirSync(modelDir).forEach(function (file) {
	require(path.join(modelDir, file));
});

// creating API for each models
var adminRoutes = require('./routing/admin');
parameters.apiAdminModels.forEach(function(model) {
	app.use('/api/'+model.name, adminRoutes);
});

// public
app.use(express.static(path.join(__dirname, '../public')));

app.use(function(req, res){
    fs.readFile(path.join(__dirname, '../public/index.html'), function(error, content) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    });
});

var server = http.createServer(app).listen(3000);