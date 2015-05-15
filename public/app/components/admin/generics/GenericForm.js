var React = require('react');
var _ = require('lodash');
var Form = require('../../../utils/FormBuilder');
var APIutils = require('../../../utils/APIutils.js');

var GenericForm = {};
module.exports = GenericForm;

GenericForm.Add = React.createClass({
    propTypes: {
        model: React.PropTypes.object.isRequired     
    },
    render: function() {
        var {model, ...other} = this.props;
        return (
            <Form
                {...other}
                title={'Add a ' + model.friendlyName}
                fields={model.form}
                onSubmit={this.handleSubmit}
            />
        );
    },
    handleSubmit: function(data) {
        console.log(data);
        APIutils.addLocal(this.props.model.name, data);
        if(this.props.onSubmit) {
            this.props.onSubmit(data);
        }
    }
});

GenericForm.Edit = React.createClass({
    propTypes: {
        model: React.PropTypes.object.isRequired,
        data: React.PropTypes.object.isRequired        
    },
    render: function() {
        var {model, data, ...other} = this.props;
        return (
            <Form
                {...other}
                title={'Edit a ' + model.friendlyName+' : ' + data.name}
                fields={model.form}
                data={data}
                onSubmit={this.handleSubmit}
            />
        );
    },
    handleSubmit: function(data) {
        var submittedData = _.merge({}, this.props.data, data);
        console.log(submittedData);
        APIutils.updateLocal(this.props.model.name, submittedData);
        if(this.props.onSubmit) {
            this.props.onSubmit(submittedData);
        }
    }
});