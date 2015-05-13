var React = require('react');
var Reflux = require('reflux');
var Form = require('../../utils/FormBuilder');
var CategoriesStore = require('../../stores/GenericStore').CategoriesStore;
var GenericLayout = require('./generics/GenericLayout');
var GenericList = require('./generics/GenericList');
var object = require('../../config/objects').categories;

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
    mixins: [Reflux.connect(CategoriesStore,'list')],
    render: function() {
        return (
            <GenericList name={object.name} list={this.state.list} params={object.list.params} />
        );
    }
});

exp.Add = React.createClass({
    render: function() {
        return (
            <Form
                title={'Ajouter une '+ object.friendlyName}
                fields={object.form}
                onSubmit={this.submit}
            />
        );
    },
    submit: function(data) {
        console.log(data);
    }
});