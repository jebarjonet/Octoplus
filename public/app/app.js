var React = require('react');
var Router = require('react-router');
var Routes = require('./routes.js');

// simulating DB
var API = require('./utils/APIutils.js');
API.saveLocal("categories", [
    {
        _id: 1,
        name: 'Bar'
    },
    {
        _id: 2,
        name: 'Musée'
    },
    {
        _id: 3,
        name: 'Restaurant'
    }
]);
API.saveLocal("places", [
    {
        _id: 1,
        name: 'Super endroit'
    }
]);


Router.run(Routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.getElementById('container'));
});