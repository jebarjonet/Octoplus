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

var APIUtils = require('./utils/APIutils');

var routes = (
    <Route name="home" path="/" handler={Home}>
        {
            APIUtils.objects.map(function(object) {
                var Layout = require('./components/'+object+'/Layout.react');
                var List = require('./components/'+object+'/List.react');
                return (
                    <Route name={object} path={object} handler={Layout}>
                        <Route name={object + '.list'} path="list" handler={List}/>
                        <Route name={object + '.add'} path="add" handler={List}/>
                        <Route name={object + '.edit'} path="edit/:id" handler={List}/>
                        <DefaultRoute handler={List}/>
                    </Route>
                );
            })
        }

        <DefaultRoute handler={FormTest}/>
    </Route>
);

module.exports = routes;