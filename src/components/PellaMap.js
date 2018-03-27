import React from 'react';
import GoogleMapReact from 'google-map-react';
import PellaMarker from './PellaMarker';

class PellaMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {lat: 33.755208, lng: -84.3565457},
      zoom: 10,
    }
  }

  setMapMarkers(markers) {
    const mapMarkers = markers.map((marker, i) => this.createMapMarker(marker, i));
    return mapMarkers;
  }

  createMapMarker(marker, i) {
    const key = `marker-${i}`;
    return <PellaMarker key={key} lat={marker.lat} lng={marker.lng} text={marker.text} />;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      mapMarkers: this.setMapMarkers(nextProps.markers)
    });
  }

  componentWillMount() {
    this.setState({
      mapMarkers: this.setMapMarkers(this.props.markers)
    })
  }

  render() {
    return (
      <div className="PellaMap">
        <GoogleMapReact
          bootstrapURLKeys={{ key: this.props.apiKey }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          {this.state.mapMarkers}
        </GoogleMapReact>
      </div>
    );
  }
}

export default PellaMap;
