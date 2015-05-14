var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var Form = require('../../utils/FormBuilder');
var PlacesStore = require('../../stores/GenericStore').PlacesStore;
var GenericLayout = require('./generics/GenericLayout');
var GenericList = require('./generics/GenericList');
var GenericForm = require('./generics/GenericForm');
var model = require('../../config/models').places;

var exp = {};
module.exports = exp;

exp.Layout = React.createClass({
    render: function() {
        return (
            <GenericLayout model={model} />
        );
    }
});

exp.List = React.createClass({
    mixins: [Reflux.connect(PlacesStore,'list')],
    render: function() {
        return (
            <GenericList model={model} list={this.state.list} />
        );
    }
});

exp.Add = React.createClass({
    componentDidMount: function() {
        // TODO center place on map if has coordinates
    },
    render: function() {
        var extendedModel = _.merge({}, model,
            {
                form: {
                    googleFind: {
                        params: {
                            onClick: this.handleGoogleFind
                        }
                    }
                }
            }
        );
        return (
            <GenericForm.Add
                model={extendedModel}
                onSubmit={this.handleSubmit}
            />
        );
    },
    handleGoogleFind: function() {
        var element = $('form [name="name"]')[0];
        element.value = 'test';
    },
    handleSubmit: function(data) {
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
            <GenericForm.Edit
                model={model}
                data={this.state.element}
            />
        );
    }
});