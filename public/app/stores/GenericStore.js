var Reflux = require('reflux');
var _ = require('lodash');
var APIActions = require('../actions/APIActions');
var APIUtils = require('../utils/APIutils');

var exp = {};
module.exports = exp;

APIUtils.objects.forEach(function(object) {
    exp[_.capitalize(object)+'Store'] = Reflux.createStore({
        listenables: [APIActions],
        getInitialState: function() {
            this.list = APIUtils.getAll(object);
            return this.list;
        }
    });
});