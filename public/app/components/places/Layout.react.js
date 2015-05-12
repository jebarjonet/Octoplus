var React = require('react');
var GenericLayout = require('../../utils/GenericLayout');

var Layout = React.createClass({
    render: function() {
        return (
            <GenericLayout name="places" />
        );
    }
});

module.exports = Layout;