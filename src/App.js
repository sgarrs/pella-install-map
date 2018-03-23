import React, { Component } from 'react';
import fetch from 'node-fetch';
import {API_KEY, GEOCODE_URL} from './constants/ApiConstants';
import PellaMap from './components/PellaMap';
import EventInfo from './components/EventInfo';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';

import data from './data.json';
import Marker from './models/Marker.js'

const jobs = data.map((job) => new Marker(job));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: jobs,
      selectedDate: moment(),
      selectedMarkers: []
    }

    this.handleDateChange = this.handleDateChange.bind(this);
//    this.getCoordinates = this.getCoordinates.bind(this);
//    this.selectMarkers = this.selectMarkers.bind(this);
//    this.fetchCoordinates = this.fetchCoordinates.bind(this);
  }

  fetchCoordinates(address) {
    // url used for Geocoder API request
    const url = `${GEOCODE_URL}json?address=${address}&key=${API_KEY}`;
    const geocoding = fetch(url)
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

    return markersWithLocation;
  }

  selectMarkers(markers, date = this.state.selectedDate) {
    const filteredMarkers = markers.filter((marker) => {
      const installStart = moment(marker.installStart, "YYYY-MM-DD");
      const installEnd = moment(marker.installEnd, "YYYY-MM-DD");

      return date.isSameOrAfter(installStart) && date.isSameOrBefore(installEnd);
    });

    const filteredMarkersWithLocation = this.getCoordinates(filteredMarkers);

    this.setState({
      selectedMarkers: filteredMarkersWithLocation,
      selectedDate: date
    });
  }

  handleDateChange(date) {
    this.selectMarkers(this.state.markers, date);
  }

  render() {
    console.log(this.state.selectedMarkers);
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
