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
        color: '#ff0000'
    },
    {
        _id: 3,
        name: 'Restaurant',
        color: '#898823'
    }
]);
APIutils.saveLocal("places", [
    {
        _id: 1,
        name: 'Super endroit',
        lat: '92.226664',
        lng: '12.645452'
    }
]);


Router.run(Routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.getElementById('container'));
});