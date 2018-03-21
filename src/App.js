import React, { Component } from 'react';
import fetch from 'node-fetch';
import {API_KEY, GEOCODE_URL} from './constants/ApiConstants';
import PellaMap from './components/PellaMap';
import EventInfo from './components/EventInfo';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';

const data = {
  markers: [
    {address: '1335 Garrick Way, Marietta, GA 30068-2169', text: 'RS', installer: 'Richard Silvernail', installStart: '3/20/2018', installEnd: '3/23/2018'},
    {address: '5267 Manhasset Ct, Atlanta, GA 30338-3409', text: 'KP', installer: 'Kris Parker', installStart: '3/19/2018', installEnd: '3/22/2018'},
    {address: '2848 N Hill Dr NE, Atlanta, GA 30305-3210', text: 'LS', installer: 'Leonard Sievers',  installStart: '3/20/2018', installEnd: '3/21/2018'},
    {address: '403 Elojay Ct, Woodstock, GA 30189-2538', text: 'RS', installer: 'Richard Silvernail',  installStart: '3/21/2018', installEnd: '3/21/2018'},
    {address: '2118 Castleway Dr NE, Atlanta, GA 30345-3916', text: 'RS', installer: 'Richard Silvernail',  installStart: '3/22/2018', installEnd: '3/22/2018'},
  ]
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: data.markers,
      markersWithLocation: [],
      selectedDate: moment('3-20-2018', 'MM-DD-YYYY'),
      selectedMarkers: []
    }

    this.handleDateChange = this.handleDateChange.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.selectMarkers = this.selectMarkers.bind(this);
    this.fetchCoordinates = this.fetchCoordinates.bind(this);
  }

  async fetchCoordinates(address) {
    // url used for Geocoder API request
    const url = `${GEOCODE_URL}json?address=${address}&key=${API_KEY}`;
    const geocoding = await fetch(url)
      .then((res) => res.json())
      .then((json) => json.results[0].geometry.location);

    return geocoding;
  }

  getCoordinates(markers) {
    let markersWithLocation = [];

    markers.forEach(async (marker, i) => {
      const address = marker.address.replace(/\s/g, '+');
      markersWithLocation.push(Object.assign({}, marker, await this.fetchCoordinates(address)));
    });

    this.setState({
      markersWithLocation: markersWithLocation,
    });
  }

  selectMarkers(markers, date = this.state.selectedDate) {
    const filteredMarkers = markers.filter((marker) => {
      const installStart = moment(marker.installStart, "MM-DD-YYYY");
      const installEnd = moment(marker.installEnd, "MM-DD-YYYY");

      return date.isSameOrAfter(installStart) && date.isSameOrBefore(installEnd);
    });

    this.setState({
      selectedMarkers: filteredMarkers,
      selectedDate: date
    });
  }

  handleDateChange(date) {
    this.selectMarkers(this.state.markersWithLocation, date);
  }

  componentWillMount() {
    this.getCoordinates(this.state.markers);
  }

  render() {
    return (
      <div className="App">
        <PellaMap
          apiKey={API_KEY}
          markers={this.state.selectedMarkers}
        />
        <div className="sidebar">
          <DatePicker
            selected={this.state.selectedDate}
            onChange={this.handleDateChange}
            className='pella-datepicker'
          />
          <EventInfo events={this.state.selectedMarkers} />
        </div>
      </div>
    );
  }
}

export default App;
