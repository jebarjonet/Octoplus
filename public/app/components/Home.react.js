var React = require('react');
var _ = require('lodash');
var Objects = require('../config/objects');

var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var Home = React.createClass({
    render: function() {
        return (
            <div>
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <Link to="home" className="navbar-brand">Admin</Link>
                        </div>
                        <ul className="nav navbar-nav">
                            {
                                _.map(Objects, function(object) {
                                    return <li><Link to={object.name}>{_.capitalize(object.friendlyName)}</Link></li>;
                                })
                            }
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

module.exports = Home;