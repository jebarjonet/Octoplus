var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var Form = require('../../utils/FormBuilder');
var PlacesStore = require('../../stores/GenericStore').PlacesStore;
var Generics = require('./generics/Generics');
var model = require('../../config/models').places;

var exp = {};
module.exports = exp;

exp.Layout = React.createClass({
    render: function() {
        return (
            <Generics.Layout model={model} />
        );
    }
});

exp.List = React.createClass({
    mixins: [Reflux.connect(PlacesStore,'list')],
    render: function() {
        return (
            <Generics.List model={model} list={this.state.list} />
        );
    }
});

var MapInteractionMixin = {
    componentWillMount: function() {
        // extend form model
        this.extendedModel = _.merge({}, model,
            {
                form: {
                    googleFind: {
                        params: {
                            onClick: this.handleGoogleFind
                        }
                    }
                }
            }
        );

        this.map = React.createElement('div', {
            id: 'map',
            style: {
                height:'200px'
            }
        });
    },
    componentDidMount: function() {
        // add map
        L.Icon.Default.imagePath = '/assets/img';
        
        var map = L.map('map', {
            minZoom: 13,
            maxZoom: 17,
            zoomControl: false,
            attributionControl: false
        }).setView([48.856874, 2.336285], 13);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
        
        // TODO center place on map if has coordinates + marker
        // L.marker([48.856874, 2.336285]).addTo(map); 
    },
    handleGoogleFind: function() {
        var element = $('form [name="name"]')[0];
        element.value = 'test';
    }
};

exp.Add = React.createClass({
    mixins: [MapInteractionMixin],
    render: function() {
        return (
            <div>
                {this.map}
                <Generics.Form.Add
                    model={this.extendedModel}
                    onSubmit={this.handleSubmit}
                />
            </div>
        );
    },
    handleSubmit: function(data) {
        console.log(data);
    }
});

exp.Edit = React.createClass({
    mixins: [
        Reflux.connectFilter(PlacesStore, 'element', function(elements) {
            return elements.filter(function(element) {
               return element._id === parseInt(this.props.params.id);
            }.bind(this))[0];
        }),
        MapInteractionMixin
    ],
    render: function() {
        return (
            <div>
                {this.map}
                <Generics.Form.Edit
                    model={this.extendedModel}
                    data={this.state.element}
                />
            </div>
        );
    }
});