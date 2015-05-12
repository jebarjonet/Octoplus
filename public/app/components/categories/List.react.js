var React = require('react');
var Reflux = require('reflux');
var CategoriesStore = require('../../stores/GenericStore').CategoriesStore;
var GenericList = require('../../utils/GenericList');

var List = React.createClass({
    mixins: [Reflux.connect(CategoriesStore,"list")],
    render: function() {
        return (
            <GenericList name="categories" list={this.state.list} attributes={['_id', 'name']} />
        );
    }
});

module.exports = List;