var _ = require('lodash');

var exp = {};
module.exports = exp;

var empty = {
    name: 'defaultName',
    friendlyName: 'default name',
    layout: {},
    list: {},
    form: {}
};

exp.categories = _.assign(_.cloneDeep(empty), {
    name: 'categories',
    friendlyName: 'category',
    list: {
        params: [
            '_id',
            {
                type: 'div',
                props: {
                    style: {height:"20px",width:"20px",backgroundColor:"__color__"},
                    title: '__name__'
                }
            },
            'name'
        ]
    },
    form: {
        name: {
            type: 'string',
            label: 'Name',
            params: {
                required: true
            }
        },
        color: {
            type: 'string',
            label: 'Hexadecimal color',
            params: {
                required: true,
                placeholder: 'ex: ff0000',
                pattern: '^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'
            }
        }
    }
});

exp.places = _.assign(_.cloneDeep(empty), {
    name: 'places',
    friendlyName: 'place',
    list: {
        params: [
            'name'
        ]
    },
    form: {
        name: {
            type: 'string',
            label: 'Name',
            params: {
                required: true
            }
        }
    }
});
