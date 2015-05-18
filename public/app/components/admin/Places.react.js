var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var Form = require('../../utils/FormBuilder');
var PlacesStore = require('../../stores/AdminStore').PlacesStore;
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

        this.Map = React.createElement('div', {
            id: 'map',
            style: {
                height:'200px'
            }
        });

        L.Icon.Default.imagePath = '/assets/img';
        this.geocoder = new google.maps.Geocoder();
        this.marker = L.marker([48.856874, 2.336285]);
    },
    componentDidMount: function() {
        this.map = L.map('map', {
            minZoom: 10,
            maxZoom: 17,
            zoomControl: false,
            attributionControl: false
        }).setView([48.856874, 2.336285], 13);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
    },
    handleGoogleFind: function() {
        var self = this;
        var name = $('form [name="name"]')[0].value + ', France';
        this.geocoder.geocode({
                'address': name
            }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var result = results[0];
                if(result.address_components[0].long_name !== 'Paris') {
                    // console.log(results);
                    var latlng = L.latLng(
                        result.geometry.location.A,
                        result.geometry.location.F
                    );
                    self.setInputsValue([
                        {
                            name: 'name',
                            value: result.address_components[0].long_name
                        },
                        {
                            name: 'address',
                            value: result.formatted_address
                        },
                        {
                            name: 'lat',
                            value: latlng.lat
                        },
                        {
                            name: 'lng',
                            value: latlng.lng
                        },
                    ]);
                    self.setPlaceOnMap(latlng);
                } else {
                    console.error('Could not find this place');
                }
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        }); 
    },
    setPlaceOnMap: function(latlng) {
        this.marker.setLatLng(latlng);
        if(!this.map.hasLayer(this.marker)) {
            this.map.addLayer(this.marker);
        }

        this.map.setView(latlng, 16, {
            pan: {
                animate: true
            },
            zoom: {
                animate: true
            }
        });
    }
};

var FormManipulationMixin = {
    setInputsValue: function(list) {
        var self = this;
        _.forEach(list, function(e) {
            self.setInputValue(e.name, e.value);
        });
    },
    setInputValue: function(inputName, value) {
        $('form [name="'+inputName+'"]')[0].value = value;
    }
};

exp.Add = React.createClass({
    mixins: [
        FormManipulationMixin,
        MapInteractionMixin
    ],
    render: function() {
        return (
            <div>
                {this.Map}
                <Generics.Form.Add
                    model={this.extendedModel}
                />
            </div>
        );
    }
});

exp.Edit = React.createClass({
    mixins: [
        Reflux.connectFilter(PlacesStore, 'element', function(elements) {
            return elements.filter(function(element) {
               return element._id === this.props.params.id;
            }.bind(this))[0];
        }),
        FormManipulationMixin,
        MapInteractionMixin
    ],
    componentWillUpdate: function(nextProps, nextState) {
        if(nextState.element) {
            this.setPlaceOnMap([
                nextState.element.lat,
                nextState.element.lng
            ]);
        }
    },
    render: function() {
        return (
            <div>
                {this.Map}
                <Generics.Form.Edit
                    model={this.extendedModel}
                    data={this.state.element}
                />
            </div>
        );
    }
});