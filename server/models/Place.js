var mongoose = require('mongoose');
var path = require('path');
var Schema = mongoose.Schema;

var PlaceSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true    	
    },
    lat: {
        type: String,
        required: true
    },
    lng: {
        type: String,
        required: true
    }
});

mongoose.model('Place', PlaceSchema);