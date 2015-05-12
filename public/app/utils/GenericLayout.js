var React = require('react');
var _ = require('lodash');

var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var GenericLayout = React.createClass({
    getInitialState: function() {
        if(this.props.name) {
            var name = this.props.name;
            var links = {};
            links[name+'List'] = 'Liste';
            return {
                links: links
            };
        }
        return {
            links: this.props.links
        };
    },
    render: function() {
        return (
            <div className="row">
                <div className="col-sm-2">
                    <ul className="nav nav-pills nav-stacked">
                        {
                            _.map(this.state.links, function(name, link) {
                                return <li><Link to={link}>{name}</Link></li>;
                            })
                        }
                    </ul>
                </div>
                <div className="col-sm-10">
                    <RouteHandler/>
                </div>
            </div>
        );
    }
});

module.exports = GenericLayout;