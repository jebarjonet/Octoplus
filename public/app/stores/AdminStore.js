var Reflux = require('reflux');
var _ = require('lodash');
var APIActions = require('../actions/APIActions');
var APIutils = require('../utils/APIutils');
var Models = require('../config/models');

var exp = {};
module.exports = exp;

_.forEach(Models, function(model) {
    exp[_.capitalize(model.name)+'Store'] = Reflux.createStore({
        listenables: [APIActions],
        init: function() {
            this.list = [];
        },
        getInitialState: function() {
            APIutils.getAll(model.name, this.updateList);
            return this.list;
        },
        updateList: function(data) {
            this.list = data;
            this.trigger(this.list);
        }
    });
});