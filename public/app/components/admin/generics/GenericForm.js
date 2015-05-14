var React = require('react');
var _ = require('lodash');
var Form = require('../../../utils/FormBuilder');

var GenericForm = {};
module.exports = GenericForm;

GenericForm.Add = React.createClass({
    render: function() {
        var {model, ...other} = this.props;
        return (
            <Form
                {...other}
                title={'Add a ' + model.friendlyName}
                fields={model.form}
            />
        );
    }
});

GenericForm.Edit = React.createClass({
    render: function() {
        var {model, data, ...other} = this.props;
        return (
            <Form
                {...other}
                title={'Edit a ' + model.friendlyName+' : ' + data.name}
                fields={model.form}
                data={data}
            />
        );
    }
});