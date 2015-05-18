var _ = require('lodash');

var exp = {};
module.exports = exp;

exp.getAll = function(name, callbackValid, callbackError) {
    $.ajax({
        type: 'GET',
        url: '/api/'+name+'/',
        dataType: 'json',
        contentType: "application/json",
        success: function(d){
            callbackValid(d);
        },
        error: function(d) {
            console.log('GET ALL FAIL');
            callbackError(d.responseText);
        }
    });
};

exp.add = function(name, data, callbackValid, callbackError) {
    $.ajax({
        type: 'POST',
        url: '/api/'+name+'/',
        data: JSON.stringify(data),
        processData: false,
        dataType: 'json',
        contentType: "application/json",
        success: function(d){
            callbackValid(d);
        },
        error: function(d) {
            console.log('ADD FAIL');
            callbackError(d.responseText);
        }
    });
};

exp.edit = function(name, data, callbackValid, callbackError) {
    $.ajax({
        type: 'PUT',
        url: '/api/'+name+'/'+data._id,
        data: JSON.stringify(data),
        processData: false,
        dataType: 'json',
        contentType: "application/json",
        success: function(d){
            callbackValid(d);
        },
        error: function(d) {
            console.log('UPDATE FAIL');
            callbackError(d.responseText);
        }
    });
};

exp.remove = function(name, data, callbackValid, callbackError) {
    $.ajax({
        type: 'DELETE',
        url: '/api/'+name+'/'+data._id,
        success: function(d){
            callbackValid(d);
        },
        error: function(d) {
            console.log('DELETE FAIL');
            callbackError(d.responseText);
        }
    });
};