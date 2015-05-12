var exp = {};
module.exports = exp;


exp.objects = ['categories', 'places'];

exp.getAll = function(name) {
    return JSON.parse(localStorage.getItem(name)) ?
        JSON.parse(localStorage.getItem(name)) :
        [];
};

exp.saveLocal = function(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
};