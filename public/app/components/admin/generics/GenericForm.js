var React = require('react');
var Router = require('react-router');
var _ = require('lodash');
var Form = require('../../../utils/FormBuilder');
var APIActions = require('../../../actions/APIActions.js');

var GenericForm = {};
module.exports = GenericForm;

GenericForm.Add = React.createClass({
    mixins: [ Router.Navigation ],
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
        var self = this;

        this.callback = function(d) {
            // TODO notif update
            self.transitionTo('admin.' + self.props.model.name);
        };
        APIActions.addItem(this.props.model.name, data, this.callback);

        if(this.props.onSubmit) {
            this.props.onSubmit(data);
        }
    }
});

GenericForm.Edit = React.createClass({
    mixins: [ Router.Navigation ],
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
        model.form.delete = {
            type: 'button',
            params: {
                onClick: this.handleDelete,
                className: 'btn-danger',
                defaultValue: 'Delete'
            }
        };

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
        var self = this;
        var submittedData = _.merge({}, this.props.data, data);

        this.callback = function(d) {
            // TODO notif update
            self.transitionTo('admin.' + self.props.model.name);
        };
        APIActions.editItem(this.props.model.name, submittedData, this.callback);

        if(this.props.onSubmit) {
            this.props.onSubmit(submittedData);
        }
    },
    handleDelete: function() {
        var a = confirm('Definitively delete this object ?');
        if(a) {
            var self = this;
            this.callback = function(d) {
                // TODO notif delete
                self.transitionTo('admin.' + self.props.model.name);
            };
            APIActions.removeItem(this.props.model.name, this.props.data, this.callback);
        }
    }
});