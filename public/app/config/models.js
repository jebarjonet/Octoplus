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

exp.categories = _.merge({}, empty, {
    name: 'categories',
    friendlyName: 'category',
    list: {
        params: [
            '_id',
            {
                type: 'div',
                props: {
                    style: {height:"20px",width:"20px",backgroundColor:"#__color__"},
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

exp.places = _.merge({}, empty, {
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
                ref: 'name',
                required: true
            }
        },
        googleFind: {
            type: 'button',
            params: {
                defaultValue: 'Find this place with Google'
            }
        },
        address: {
            type: 'string',
            label: 'Address',
            params: {
                ref: 'address',
                required: true
            }
        },
        lat: {
            type: 'string',
            label: 'Latitude',
            params: {
                ref: 'lat',
                required: true
            }
        },
        lng: {
            type: 'string',
            label: 'Longitude',
            params: {
                ref: 'lng',
                required: true
            }
        }
    }
});
