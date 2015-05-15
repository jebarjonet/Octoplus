var _ = require('lodash');

var exp = {};
module.exports = exp;

exp.getAll = function(name) {
    return JSON.parse(localStorage.getItem(name)) ?
        JSON.parse(localStorage.getItem(name)) :
        [];
};

exp.addLocal = function(name, data) {
    var list = this.getAll(name);
    data._id = Math.floor((Math.random() * 1000000000) + 3);
    list.push(data);
    localStorage.setItem(name, JSON.stringify(list));
};

exp.updateLocal = function(name, data) {
    var list = this.getAll(name);
    localStorage.removeItem(name);
    _.forEach(list, function(element, key) {
        if(element._id === data._id) {
            list[key] = data;
        }
    });
    localStorage.setItem(name, JSON.stringify(list));
};

exp.save = function(name, data) {
    if(data._id) {
        // UPDATE
        updateLocal(name, data);
    } else {
        // ADD
        addLocal(name, data);
    }

};