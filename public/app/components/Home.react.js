var React = require('react');

var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var Home = React.createClass({
    render: function() {
        return (
            <div className="container" style={{marginTop: '30px'}}>
                <img className="pull-right" style={{height: '120px'}} src="http://media.giphy.com/media/I0ROdXqhDmGE8/giphy.gif"/>
                <br/>
                <ul className="nav nav-pills" style={{marginBottom: '10px'}}>
                    <li><Link to="home" className="important">Accueil</Link></li>
                    <li><Link to="places">Lieux</Link></li>
                    <li><Link to="categories">Catégories</Link></li>
                </ul>
                <p className="text-muted">Logged in as <b>Dumbledore</b></p>

                <RouteHandler/>
            </div>
        );
    }
});

module.exports = Home;