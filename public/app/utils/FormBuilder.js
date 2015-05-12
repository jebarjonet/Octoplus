var React = require('react');
var addons = require('react/addons');
var _ = require('lodash');
var FormData = require('react-form-data');


var Form = React.createClass({
    mixins: [ FormData ],
    componentWillMount: function() {
        this.formData = this.props.data;
    },
    formDataDidChange: function() {
        // TODO error handling
        console.log(this.formData);
    },
    render: function() {
        // TODO automatic Bootstrap layout
        
        return (
            <form onSubmit={this.submit} onChange={this.updateFormData}>
                <h1>Form</h1>
                {
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
                    }, this)
                }

                <button type="submit" className="btn btn-default">Envoyer</button>
            </form>
        );
    },
    submit: function(e) {
        e.preventDefault();
        console.log(this.formData);
        this.props.onSubmit('test');
    }
});

var Input = React.createClass({
    render: function() {
        var [type, params, childs] = this.generateLayout(this.props.type, this.props.params);

        return React.createElement(type, params, childs);
    },
    generateLayout: function(type, params) {
        var cx = React.addons.classSet;
        params = $.extend(true, {}, params);
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
                    _.forEach(params.choices, function(name, value) {
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
                                            defaultChecked: ~params.defaultValue.indexOf(value) ? true : false
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

        if(params.choices)
            delete params.choices;
        
        // class
        if(framed)
            params.className += cx('form-control');

        if(!childs.length) childs = null;

        return [type, params, childs];
    }
});

module.exports = Form;