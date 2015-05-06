var express = require('express');
var path = require('path');
var http = require('http');

var app = express();

app.use(express.static(path.join(__dirname, '../public')));

var server = http.createServer(app);
server.listen(3000);