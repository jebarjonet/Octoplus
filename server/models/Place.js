var mongoose = require('mongoose');
var path = require('path');
var Schema = mongoose.Schema;

var PlaceSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
});

mongoose.model('Place', PlaceSchema);