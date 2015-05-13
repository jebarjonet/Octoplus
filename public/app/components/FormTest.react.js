var React = require('react');
var Form = require('../utils/FormBuilder');

var FormTest = React.createClass({
    render: function() {
        return (
            <Form
                onSubmit={this.submit}
                fields={{
                    string: {
                        type: 'string',
                        label: 'A string',
                        params: {
                            required: true
                        }
                    },
                    email: {
                        type: 'email',
                        label: 'An email'
                    },
                    text: {
                        type: 'text',
                        label: 'A textarea',
                        params: {
                            rows: 6
                        }
                    },
                    select: {
                        type: 'select',
                        label: 'A selector',
                        params: {
                            choices: {
                                fr: 'France',
                                en: 'England'
                            },
                            required: true
                        }
                    },
                    button: {
                        type: 'button',
                        params: {
                            onClick: this.test,
                            defaultValue: 'Trigger a test function ?'
                        }
                    },
                    radio:  {
                        type: 'radio',
                        label: 'Radio',
                        params: {
                            choices: {
                                m: 'Male',
                                f: 'Female'
                            }
                        }
                    },
                    checkbox:  {
                        type: 'checkbox',
                        label: 'Checkbox',
                        params: {
                            choices: {
                                g: 'Good',
                                b: 'Bad'
                            }
                        }
                    }
                }}
                data={{
                    string: 'hello',
                    email: 'mail@mail.fr',
                    select: 'en',
                    checkbox: ['b']
                }}
            >
            </Form>
        );
    },
    submit: function(data) {
        console.log(data);
    },
    test: function(e) {
        console.log('triggered');
        console.log(e);
    }
});

module.exports = FormTest;