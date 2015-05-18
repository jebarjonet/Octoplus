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
        // APIutils.addLocal(this.props.model.name, data);
        $.ajax({
            type: 'POST',
            url: '/api/'+this.props.model.name+'/',
            data: JSON.stringify(data),
            processData: false,
            dataType: 'json',
            contentType: "application/json",
            success: function(data){
                console.log('DONE');
                console.log(data);
            },
            error: function(data) {
                console.error('FAIL');
                console.log(data);
                console.error(JSON.parse(data.responseText).message);
            }
        });
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
    getDefaultProps: function() {
        return {
            data: {}
        };
    },
    getInitialState: function() {
        return {
            loading: true 
        };
    },
    componentWillReceiveProps: function(nextProps) {
        if(nextProps.data._id) {
            this.setState({loading: false});
        }
    },
    render: function() {
        var {model, data, ...other} = this.props;
        var form = <p>Loading...</p>;
        if(!this.state.loading) {
            form = <Form
                key={data._id}
                {...other}
                title={'Edit a ' + model.friendlyName+' : ' + data.name}
                fields={model.form}
                data={data}
                onSubmit={this.handleSubmit}
            />;
        }
        return form;
    },
    handleSubmit: function(data) {
        var submittedData = _.merge({}, this.props.data, data);
        console.log(submittedData);
        // APIutils.updateLocal(this.props.model.name, submittedData);

        $.ajax({
            type: 'PUT',
            url: '/api/'+this.props.model.name+'/'+this.props.data._id,
            data: JSON.stringify(submittedData),
            processData: false,
            dataType: 'json',
            contentType: "application/json",
            success: function(data){
                console.log('DONE');
                console.log(data);
            },
            error: function(data) {
                console.error('FAIL');
                console.log(data);
                console.error(JSON.parse(data.responseText).message);
            }
        });
        if(this.props.onSubmit) {
            this.props.onSubmit(submittedData);
        }
    }
});