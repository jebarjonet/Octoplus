var express = require('express');
var path = require('path');
var http = require('http');
var fs = require('fs');

var app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use(function(req, res){
    fs.readFile(path.join(__dirname, '../public/index.html'), function(error, content) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    });
});

var server = http.createServer(app).listen(3000);