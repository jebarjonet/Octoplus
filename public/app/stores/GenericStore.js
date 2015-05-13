var Reflux = require('reflux');
var _ = require('lodash');
var APIActions = require('../actions/APIActions');
var APIutils = require('../utils/APIutils');
var Objects = require('../config/objects');

var exp = {};
module.exports = exp;

_.forEach(Objects, function(object) {
    exp[_.capitalize(object.name)+'Store'] = Reflux.createStore({
        listenables: [APIActions],
        getInitialState: function() {
            this.list = APIutils.getAll(object.name);
            return this.list;
        }
    });
});