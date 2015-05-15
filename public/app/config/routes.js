var React = require('react');
var Router = require('react-router');
var _ = require('lodash');
var Models = require('../config/models');

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var Home = require('../components/Home.react');
var FormTest = require('../components/FormTest.react');
var Categories = require('../components/admin/Categories.react');
var Places = require('../components/admin/Places.react');

var routes = (
    <Route name="home" path="/" handler={Home}>
        {
            _.map(Models, function(model) {
                var Layout = require('../components/admin/'+_.capitalize(model.name)+'.react').Layout;
                var List = require('../components/admin/'+_.capitalize(model.name)+'.react').List;
                var Add = require('../components/admin/'+_.capitalize(model.name)+'.react').Add;
                var Edit = require('../components/admin/'+_.capitalize(model.name)+'.react').Edit;
                return (
                    <Route key={model.name} name={model.name} path={model.name} handler={Layout}>
                        <Route name={model.name + '.list'} path="list" handler={List}/>
                        <Route name={model.name + '.add'} path="add" handler={Add}/>
                        <Route name={model.name + '.edit'} path="edit/:id" handler={Edit}/>
                        <DefaultRoute handler={List}/>
                    </Route>
                );
            })
        }

        <DefaultRoute handler={FormTest}/>
    </Route>
);

module.exports = routes;