var React = require('react');
var Reflux = require('reflux');
var Form = require('../../utils/FormBuilder');
var PlacesStore = require('../../stores/GenericStore').PlacesStore;
var GenericLayout = require('./generics/GenericLayout');
var GenericList = require('./generics/GenericList');
var object = require('../../config/objects').places;

var exp = {};
module.exports = exp;

exp.Layout = React.createClass({
    render: function() {
        return (
            <GenericLayout name={object.name} />
        );
    }
});

exp.List = React.createClass({
    mixins: [Reflux.connect(PlacesStore,'list')],
    render: function() {
        return (
            <GenericList name={object.name} title={object.friendlyName} list={this.state.list} params={object.list.params} />
        );
    }
});

exp.Add = React.createClass({
    render: function() {
        return (
            <Form
                title={'Add a '+ object.friendlyName}
                fields={object.form}
                onSubmit={this.submit}
            />
        );
    },
    submit: function(data) {
        console.log(data);
    }
});

exp.Edit = React.createClass({
    mixins: [Reflux.connectFilter(PlacesStore, 'element', function(elements) {
        return elements.filter(function(element) {
           return element._id === parseInt(this.props.params.id);
        }.bind(this))[0];
    })],
    render: function() {
        return (
            <Form
                title={'Edit a '+object.friendlyName+' : '+this.state.element.name}
                fields={object.form}
                data={this.state.element}
                onSubmit={this.submit}
            />
        );
    },
    submit: function(data) {
        console.log(data);
    }
});