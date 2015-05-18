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
	.get(function(req, res, next) {
		// GET all objects
		Model.find(function(err, elements){
		    if(err) return next(err);
		    res.send(elements);
		})
	})
	.post(function(req, res, next) {
		// ADD object
		var element = new Model(req.body);
		element.save(function (err) {
			if(err){
	            if(err.name == "ValidationError"){
	                err.status = 400;
	                res.status(400).json(err);
	            } else {
	                next(err);
	            }
	            return false;
	        }

			res.send(element);
		});
	});

router.route('/:id')
	.get(function(req, res, next) {
		// GET object
		Model.findById(req.params.id, function (err, element){
			if(err) return next(err);
		    res.send(element);
		});
	})
	.put(function(req, res, next) {
		// UPDATE object
		Model.findOneAndUpdate(
			{ _id: req.params.id },
			req.body,
			function (err) {
			if(err){
	            if(err.name == "ValidationError"){
	                err.status = 400;
	                res.status(400).json(err);
	            } else {
	                next(err);
	            }
	            return false;
	        }
		});
	})
	.delete(function(req, res, next) {
		// DELETE object
	});

module.exports = router;