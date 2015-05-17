var express = require('express');
var mongoose = require('mongoose');
var parameters = require('../config/parameters');
var _ = require('lodash');
var router = express.Router();

var Model;
// get object and model to use from url
router.use(function(req, res, next) {
	var name = req.originalUrl.split('/')[2];
	var configModel = _.find(parameters.apiAdminModels, {'name': name});
	Model = mongoose.model(configModel.model);
    console.log(req.method, req.url);
    next(); 
});

router.route('/')
	.get(function(req, res) {
		// GET all objects
		Model.find(function(err, elements){
		    if(err) return next(err);
		    res.send(elements);
		})
	})
	.post(function(req, res) {
		// ADD object
	});

router.route('/:id')
	.get(function(req, res) {
		// GET object
	})
	.put(function(req, res) {
		// UPDATE object
	})
	.delete(function(req, res) {
		// DELETE object
	});

module.exports = router;