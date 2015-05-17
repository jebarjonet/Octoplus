var React = require('react');
var Router = require('react-router');
var _ = require('lodash');
var Models = require('../config/models');

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var App = React.createClass({
    render: function() {
        return (
            <Router.RouteHandler/>
        );
    }
});

var Home = require('../components/Home.react');
var Admin = require('../components/admin/Admin.react');
var FormTest = require('../components/admin/FormTest.react');
var Categories = require('../components/admin/Categories.react');
var Places = require('../components/admin/Places.react');

var routes = (
    <Route handler={App}>
        <Route handler={Home}>
            
        </Route>
        <Route name="admin" path="admin" handler={Admin}>
            {
                _.map(Models, function(model) {
                    var Layout = require('../components/admin/'+_.capitalize(model.name)+'.react').Layout;
                    var List = require('../components/admin/'+_.capitalize(model.name)+'.react').List;
                    var Add = require('../components/admin/'+_.capitalize(model.name)+'.react').Add;
                    var Edit = require('../components/admin/'+_.capitalize(model.name)+'.react').Edit;
                    return (
                        <Route key={model.name} name={'admin.' + model.name} path={model.name} handler={Layout}>
                            <Route name={'admin.' + model.name + '.list'} path="list" handler={List}/>
                            <Route name={'admin.' + model.name + '.add'} path="add" handler={Add}/>
                            <Route name={'admin.' + model.name + '.edit'} path="edit/:id" handler={Edit}/>
                            <DefaultRoute handler={List}/>
                        </Route>
                    );
                })
            }

            <DefaultRoute handler={FormTest}/>
        </Route>
    </Route>
);

module.exports = routes;