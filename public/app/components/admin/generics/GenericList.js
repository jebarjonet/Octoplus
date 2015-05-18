var React = require('react');
var _ = require('lodash');
var Link = require('react-router').Link;

/**
 * Replace "__value__" in props with the element.value
 * @param  {[type]} element     Object containing values
 * @param  {[type]} props       Properties of the object we want to show     
 */
function replaceDataHolders(element, props) {
    if(typeof(props) === 'object') {
        _.forEach(props, function(prop) {
            if(typeof(prop) === 'object')
                prop = replaceDataHolders(element, prop);
        });
    }

    _.forEach(props, function(prop, key) {
        if(typeof(prop) !== 'object') {
            props[key] = prop.replace(/__([^_]+)__/, function(match, p) {
                return element[p];
            });
        }
    });
    
    return props;
}

var List = React.createClass({
    propTypes: {
        model: React.PropTypes.object.isRequired,
        list: React.PropTypes.array.isRequired
    },
    render: function() {
        var self = this;
        var {model, list, ...other} = this.props;
        return (
            <div>
                <h1>{_.capitalize(model.friendlyName)+' list'}</h1>
                <table className="table table-hover">
                    <tbody>
                        {
                            list.map(function(element) {
                                return (
                                    <tr key={element._id}>
                                        {
                                            _.map(model.list.params, function(param) {
                                                var content = typeof(param) === 'string' ?
                                                    element[param] :
                                                    React.createElement(param.type, replaceDataHolders(element, _.cloneDeep(param.props)));
                                                return (
                                                    <td key={element._id + param}>{content}</td>
                                                );
                                            })
                                        }
                                        <td>
                                            <div className="btn-group btn-group-xs pull-right">
                                                <Link to={'admin.' + model.name + '.edit'} params={{id: element._id}} className="btn btn-info">Editer</Link>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = List;