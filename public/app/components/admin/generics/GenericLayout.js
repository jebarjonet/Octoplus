var React = require('react');
var _ = require('lodash');

var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var GenericLayout = React.createClass({
    propTypes: {
        model: React.PropTypes.object.isRequired,
        links: React.PropTypes.object        
    },
    getInitialState: function() {
        var links = this.props.links;
        if(this.props.model.name) {
            var name = this.props.model.name;
            var generatedLinks = {};
            generatedLinks['admin.'+name+'.list'] = {
                name: 'List',
                icon: 'list'
            };
            generatedLinks['admin.'+name+'.add'] = {
                name: 'Add',
                icon: 'add'
            };
            links = _.merge({}, generatedLinks, links);
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
                            _.map(this.state.links, function(data, link) {
                                return (
                                    <li key={link}>
                                        <Link to={link}>
                                            <i className={'md md-'+data.icon} style={{marginRight:'6px'}}></i>
                                            {data.name}
                                        </Link>
                                    </li>
                                );
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