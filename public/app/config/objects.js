var _ = require('lodash');

var exp = {};
module.exports = exp;

var model = {
    name: 'defaultName',
    friendlyName: 'nom par défaut',
    layout: {},
    list: {},
    form: {}
};

exp.categories = _.assign(_.cloneDeep(model), {
    name: 'categories',
    friendlyName: 'catégorie',
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
    }
});

exp.places = _.assign(_.cloneDeep(model), {
    name: 'places',
    friendlyName: 'lieux',
    list: {
        params: [
            'name'
        ]
    }
});
