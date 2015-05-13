var React = require('react');
var _ = require('lodash');

var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var GenericLayout = React.createClass({
    getInitialState: function() {
        var links = this.props.links;
        if(this.props.name) {
            var name = this.props.name;
            var generatedLinks = {};
            generatedLinks[name+'.list'] = 'List';
            generatedLinks[name+'.add'] = 'Add';
            links = _.assign(generatedLinks, links);
        }
        return {
            links: links
        };
    },
    render: function() {
        return (
            <div className="row">
                <div className="col-sm-3 col-md-2">
                    <ul className="nav nav-pills nav-stacked">
                        {
                            _.map(this.state.links, function(name, link) {
                                return <li><Link to={link}>{name}</Link></li>;
                            })
                        }
                    </ul>
                </div>
                <div className="col-sm-9 col-md-10">
                    <RouteHandler/>
                </div>
            </div>
        );
    }
});

module.exports = GenericLayout;