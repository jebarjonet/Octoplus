var React = require('react');
var _ = require('lodash');
var Link = require('react-router').Link;

/**
 * Replace "__value__" in props with the object.value
 * @param  {[type]} object Object containing values
 * @param  {[type]} props  Properties of the object we want to show     
 */
function replaceDataHolders(object, props) {
    if(typeof(props) === 'object') {
        _.forEach(props, function(prop) {
            if(typeof(prop) === 'object')
                prop = replaceDataHolders(object, prop);
        });
    }

    _.forEach(props, function(prop, key) {
        if(typeof(prop) !== 'object') {
            props[key] = prop.replace(/__([^_]+)__/, function(match, p) {
                return object[p];
            });
        }
    });
    
    return props;
}

var List = React.createClass({
    render: function() {
        var self = this;
        return (
            <table className="table table-hover">
                {
                    self.props.list.map(function(object) {
                        return (
                            <tr key={object._id}>
                            {
                                _.map(self.props.params, function(param) {
                                    var content = typeof(param) === 'string' ?
                                        object[param] :
                                        React.createElement(param.type, replaceDataHolders(object, _.cloneDeep(param.props)));
                                    return (
                                        <td>{content}</td>
                                    );
                                })
                            }
                            <td>
                                <div className="btn-group btn-group-xs pull-right">
                                    <Link to={self.props.name + '.edit'} params={{id: 1}} className="btn btn-info">Editer</Link>
                                </div>
                            </td>
                            </tr>
                        );
                    })
                }
            </table>
        );
    }
});

module.exports = List;