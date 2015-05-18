var React = require('react');
var classNames = require('classnames');
var _ = require('lodash');

var Form = React.createClass({
    componentWillMount: function() {
        this.formData = this.props.data ?
            this.props.data:
            {};
    },
    componentDidMount: function() {
        // Front errors highlighting
        $('form').on('keydown keyup change blur', ':input', function() {
            if($(this).val()) {
                $(this).addClass('dirty');
            } else if(!$(this).prop('required')) {
                $(this).removeClass('dirty');
            }
        });
    },
    render: function() {
        var fields = _.cloneDeep(this.props.fields);
        return (
            <form onSubmit={this.handleSubmit} onChange={this.updateFormData}>
                {
                    this.props.title ?
                    <h1>{this.props.title}</h1>:
                    null
                }
                {
                    _.size(this.props.fields) > 0 ?
                    _.map(fields, function(field, key) {
                        if(!field.params)
                            field.params = {};
                        field.params.name = key;

                        if(!field.params.defaultValue) {
                            if(this.formData[key]) {
                                field.params.defaultValue = this.formData[key];
                            } else {
                                field.params.defaultValue = null;
                            }
                        }

                        return (
                            <div key={key} className="form-group">
                                <label>{field.label}</label>
                                <Input type={field.type} params={field.params} />
                            </div>
                        );
                    }, this):
                    <p>This form has not been configured yet</p>
                }
                {
                    _.size(this.props.fields) > 0 ?
                    <button type="submit" className="btn btn-default">Send</button>:
                    null
                }
            </form>
        );
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var rawData = $('form').serializeArray();
        var formData = {};
        _.forEach(rawData, function(element) {
            // for multiple answers (like checkboxes)
            if(formData[element.name]) {
                if(typeof formData[element.name] !== 'object') {
                    formData[element.name] = [formData[element.name]];
                }
                formData[element.name].push(element.value);
            } else {
                formData[element.name] = element.value;
            }
        });
        if(this.props.onSubmit) {
            this.props.onSubmit(formData);
        }
    }
});

var Input = React.createClass({
    render: function() {
        var [type, params, childs] = this.generateLayout(this.props.type, this.props.params);

        return React.createElement(type, params, childs);
    },
    generateLayout: function(type, params) {
        params.className = classNames(params.className);
        var childs = [];
        var framed = true;

        if(!type)
            console.error('Missing a "type" while creating Input');

        // disabling bootstrap frame around input
        var noFrame = ['file', 'radio', 'checkbox', 'button'];
        if(~noFrame.indexOf(type))
            framed = false;

        // types
        switch(type) {
            case 'text':
                type = 'textarea';
                break;

            case 'select':
                childs.push(React.createElement("option", { value: '' }, '---'));
                if(params.choices) {
                    _.forEach(params.choices, function(name, value) {
                        childs.push(
                            React.createElement("option", { value: value }, name)
                        );
                    });
                }
                break;

            case 'radio':
            case 'checkbox':
                if(params.choices) {
                    // select first one if no selected for radio buttons
                    if(type === 'radio') {
                        var hasSelected = _.find(params.choices, function(name, value) {
                            return value === params.defaultValue;
                        });
                        if(hasSelected === undefined) {
                            params.defaultValue = Object.keys(params.choices)[0];
                        }
                    }

                    _.forEach(params.choices, function(name, value) {
                        var defaultChecked = false;
                        if(params.defaultValue) {
                            if(type === 'radio') {
                                defaultChecked = params.defaultValue === value ? true : false;
                            } else {
                                defaultChecked = ~params.defaultValue.indexOf(value) ? true : false;
                            }
                        }
                        childs.push(
                            React.createElement("div",
                            {
                                className: type
                            },
                                React.createElement("label",
                                    {
                                        htmlFor: type+'_'+value
                                    },
                                    [ 
                                    React.createElement("input",
                                        {
                                            type: type,
                                            id: type+'_'+value,
                                            value: value,
                                            name: params.name,
                                            defaultChecked: defaultChecked
                                        }
                                    ),
                                    name
                                    ]
                                )
                            )
                        );
                    });
                }
                type = 'div';
                break;

            default:
                // basic input type
                params.type = type;

                switch(type) {
                    case 'string':
                        params.type = 'text';
                        break;

                    case 'button':
                        params.className = classNames('btn', 'btn-default', params.className);
                        break;
                }

                type = 'input';
        }

        if(params.choices) {
            delete params.choices;
        }
        
        // class
        if(framed) {
            params.className += classNames('form-control');
        }

        if(!childs.length) {
            childs = null;
        }

        return [type, params, childs];
    }
});

module.exports = Form;