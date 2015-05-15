var React = require('react');
var Router = require('react-router');
var Routes = require('./config/routes.js');

// simulating DB
localStorage.clear();
var APIutils = require('./utils/APIutils.js');
localStorage.setItem("categories", JSON.stringify([
    {
        _id: 1,
        name: 'Bar',
        color: '125454'
    },
    {
        _id: 2,
        name: 'Musée',
        color: 'ff0000'
    },
    {
        _id: 3,
        name: 'Restaurant',
        color: '898823'
    }
]));
localStorage.setItem("places", JSON.stringify([
    {
        _id: 1,
        name: 'Tour Eiffel',
        lat: '48.8583',
        lng: '2.294481'
    }
]));

Router.run(Routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.getElementById('container'));
});