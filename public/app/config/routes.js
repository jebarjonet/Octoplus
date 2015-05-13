var React = require('react');
var Router = require('react-router');
var _ = require('lodash');
var Objects = require('../config/objects');

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var Home = require('../components/Home.react');
var FormTest = require('../components/FormTest.react');
var Categories = require('../components/admin/Categories.react');
var Places = require('../components/admin/Places.react');

var routes = (
    <Route name="home" path="/" handler={Home}>
        {
            _.map(Objects, function(object) {
                var Layout = require('../components/admin/'+_.capitalize(object.name)+'.react').Layout;
                var List = require('../components/admin/'+_.capitalize(object.name)+'.react').List;
                var Add = require('../components/admin/'+_.capitalize(object.name)+'.react').Add;
                return (
                    <Route name={object.name} path={object.name} handler={Layout}>
                        <Route name={object.name + '.list'} path="list" handler={List}/>
                        <Route name={object.name + '.add'} path="add" handler={Add}/>
                        <Route name={object.name + '.edit'} path="edit/:id" handler={List}/>
                        <DefaultRoute handler={List}/>
                    </Route>
                );
            })
        }

        <DefaultRoute handler={FormTest}/>
    </Route>
);

module.exports = routes;