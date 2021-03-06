var React = require('react');
var _ = require('lodash');
var Models = require('../../config/models');

var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var Admin = React.createClass({
    render: function() {
        return (
            <div className="admin">
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <Link to="admin" className="navbar-brand">Admin</Link>
                        </div>
                        <ul className="nav navbar-nav">
                            {
                                _.map(Models, function(model) {
                                    return <li key={model.name}><Link to={'admin.' + model.name}>{_.capitalize(model.friendlyName)}</Link></li>;
                                })
                            }
                        </ul>
                        <ul className="nav navbar-nav pull-right">
                            <li><Link to="home">Back to website</Link></li>
                        </ul>
                    </div>
                </nav>
                <div className="container">
                    <p className="text-muted" style={{marginBottom: '22px'}}>Logged in as <b>Dumbledore</b></p>

                    <RouteHandler/>
                </div>
            </div>
        );
    }
});

module.exports = Admin;