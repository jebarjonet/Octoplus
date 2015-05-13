var React = require('react');
var addons = require('react/addons');
var _ = require('lodash');
var FormData = require('react-form-data');

var Form = React.createClass({
    mixins: [ FormData ],
    componentWillMount: function() {
        this.formData = this.props.data ?
            this.props.data:
            {};
    },
    componentDidMount: function() {
        var self = this;
        // Front errors highlighting
        $('form').on('keydown keyup change blur', ':input', function() {
            if($(this).val()) {
                $(this).addClass('dirty');
            } else if(!$(this).prop('required')) {
                $(this).removeClass('dirty');
            }
        });
    },
    formDataDidChange: function() {
        // TODO backend error handling
        // console.log(this.formData);
    },
    render: function() {
        return (
            <form onSubmit={this.submit} onChange={this.updateFormData}>
                {
                    this.props.title ?
                    <h1>{this.props.title}</h1>:
                    null
                }
                {
                    _.size(this.props.fields) > 0 ?
                    _.map(this.props.fields, function(field, key) {
                        if(!field.params)
                            field.params = {};
                        field.params.name = key;

                        if(this.formData[key])
                            field.params.defaultValue = this.formData[key];

                        return (
                            <div key={key} className="form-group">
                                <label>{field.label}</label>
                                <Input type={field.type} params={field.params} />
                            </div>
                        );
                    }, this):
                    <p>Ce formulaire n'est pas encore configuré</p>
                }
                {
                    _.size(this.props.fields) > 0 ?
                    <button type="submit" className="btn btn-default">Send</button>:
                    null
                }
            </form>
        );
    },
    submit: function(e) {
        var self = this;
        e.preventDefault();
        this.props.onSubmit(this.formData);
    }
});

var Input = React.createClass({
    render: function() {
        var [type, params, childs] = this.generateLayout(this.props.type, this.props.params);

        return React.createElement(type, params, childs);
    },
    generateLayout: function(type, params) {
        var cx = React.addons.classSet;
        params = _.cloneDeep(params);
        params.className = cx(params.className);
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
                        params.className += cx('btn', 'btn-default');
                        break;
                }

                type = 'input';
        }

        if(params.choices) {
            delete params.choices;
        }
        
        // class
        if(framed) {
            params.className += cx('form-control');
        }

        if(!childs.length) {
            childs = null;
        }

        return [type, params, childs];
    }
});

module.exports = Form;