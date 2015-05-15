var React = require('react');
var Reflux = require('reflux');
var CategoriesStore = require('../../stores/GenericStore').CategoriesStore;
var Generics = require('./generics/Generics');
var model = require('../../config/models').categories;

var exp = {};
module.exports = exp;

exp.Layout = React.createClass({
    render: function() {
        return (
            <Generics.Layout model={model} />
        );
    }
});

exp.List = React.createClass({
    mixins: [Reflux.connect(CategoriesStore, 'list')],
    render: function() {
        return (
            <Generics.List model={model} list={this.state.list} />
        );
    }
});

exp.Add = React.createClass({
    render: function() {
        return (
            <Generics.Form.Add
                model={model}
            />
        );
    }
});

exp.Edit = React.createClass({
    mixins: [Reflux.connectFilter(CategoriesStore, 'element', function(elements) {
        return elements.filter(function(element) {
           return element._id === parseInt(this.props.params.id);
        }.bind(this))[0];
    })],
    render: function() {
        return (
            <Generics.Form.Edit
                model={model}
                data={this.state.element}
            />
        );
    }
});