var React = require('react');
var Router = require('react-router');
var Routes = require('./config/routes.js');

// simulating DB
var APIutils = require('./utils/APIutils.js');
APIutils.saveLocal("categories", [
    {
        _id: 1,
        name: 'Bar',
        color: '#125454'
    },
    {
        _id: 2,
        name: 'Musée',
        color: 'red'
    },
    {
        _id: 3,
        name: 'Restaurant',
        color: '#00f'
    }
]);
APIutils.saveLocal("places", [
    {
        _id: 1,
        name: 'Super endroit'
    }
]);


Router.run(Routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.getElementById('container'));
});