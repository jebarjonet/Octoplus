var React = require('react');

var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var Home = React.createClass({
    render: function() {
        return (
            <div className="container" style={{marginTop: '30px'}}>
                <nav className="navbar navbar-default">
                    <div className="container">
                    <div className="navbar-header">
                        <Link to="home" className="navbar-brand">Admin</Link>
                    </div>
                        <ul className="nav navbar-nav">
                            <li><Link to="places">Lieux</Link></li>
                            <li><Link to="categories">Catégories</Link></li>
                        </ul>
                    </div>
                </nav>
                <p className="text-muted" style={{marginTop: '8px', marginBottom: '15px'}}>Logged in as <b>Dumbledore</b></p>

                <RouteHandler/>
            </div>
        );
    }
});

module.exports = Home;