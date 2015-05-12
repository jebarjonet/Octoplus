var React = require('react');
var Link = require('react-router').Link;

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
                                self.props.attributes.map(function(attribute) {
                                    return (
                                        <td>{object[attribute]}</td>
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