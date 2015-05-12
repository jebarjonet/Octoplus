var React = require('react');
var Reflux = require('reflux');
var PlacesStore = require('../../stores/GenericStore').PlacesStore;
var GenericList = require('../../utils/GenericList');

var List = React.createClass({
    mixins: [Reflux.connect(PlacesStore,"list")],
    render: function() {
        return (
            <GenericList name="places" list={this.state.list} attributes={['name']} />
        );
    }
});

module.exports = List;