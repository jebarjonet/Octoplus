var _ = require('lodash');

var exp = {};
module.exports = exp;

var model = {
    name: 'defaultName',
    friendlyName: 'default name',
    layout: {},
    list: {},
    form: {}
};

exp.categories = _.assign(_.cloneDeep(model), {
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
            type: 'color',
            label: 'Color',
            params: {
                required: true
            }
        }
    }
});

exp.places = _.assign(_.cloneDeep(model), {
    name: 'places',
    friendlyName: 'place',
    list: {
        params: [
            'name'
        ]
    }
});
