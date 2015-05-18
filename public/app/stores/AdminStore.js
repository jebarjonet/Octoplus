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
            APIutils.getAll(model.name, this.updateList, this.error);
            return this.list;
        },
        onAddItem: function(name, data, callback) {
            APIutils.add(name, data, callback, this.error);
        },
        onEditItem: function(name, data, callback) {
            APIutils.edit(name, data, callback, this.error);
        },
        onRemoveItem: function(name, data, callback) {
            APIutils.remove(name, data, callback, this.error);
        },
        error: function(text) {
            // TODO notif error
            console.error(text);
        },
        updateList: function(data) {
            this.list = data;
            this.trigger(this.list);
        }
    });
});