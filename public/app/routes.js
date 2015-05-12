var React = require('react');
var Router = require('react-router');
var _ = require('lodash');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var Home = require('./components/Home.react');
var FormTest = require('./components/FormTest.react');
var CategoriesLayout = require('./components/categories/Layout.react');
var CategoriesList = require('./components/categories/List.react');
var PlacesLayout = require('./components/places/Layout.react');
var PlacesList = require('./components/places/List.react');

var objects = ['categories', 'places'];

var routes = (
    <Route name="home" path="/" handler={Home}>
        {
            objects.map(function(object) {
                var Layout = require('./components/'+object+'/Layout.react');
                var List = require('./components/'+object+'/List.react');
                return (
                    <Route name={object} path={object} handler={Layout}>
                        <Route name={object + 'List'} path="list" handler={List}/>
                        <DefaultRoute handler={List}/>
                    </Route>
                );
            })
        }

        <DefaultRoute handler={FormTest}/>
    </Route>
);

module.exports = routes;