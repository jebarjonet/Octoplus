var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Home = React.createClass({
	componentDidMount: function() {
        this.map = L.map('map', {
            minZoom: 6,
            maxZoom: 17,
            zoomControl: false,
            attributionControl: false
        }).setView([48.856874, 2.336285], 13);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
	},
    render: function() {
        return (
            <div>
            	<Link className="btn btn-default" to="admin" style={{position:'absolute',top:'20px',left:'20px',zIndex:'1'}}>Admin</Link>
                <div id="map" style={{height:'100vh',width:'100vw'}}></div>
            </div>
        );
    }
});

module.exports = Home;