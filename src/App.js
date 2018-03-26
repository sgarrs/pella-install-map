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

    markers.forEach((marker, i) => {
      const address = marker.address.replace(/\s/g, '+');
      this.fetchCoordinates(address).then((coords) =>
        markersWithLocation.push(Object.assign({}, marker, coords))
      );
    });

    return markersWithLocation;
  }

  selectMarkers(markers, date = this.state.selectedDate) {
    const filteredMarkers = markers.filter((marker) => {
      return date.isSameOrAfter(moment(marker.installStart, "YYYY-MM-DD"))
        && date.isSameOrBefore(moment(marker.installEnd, "YYYY-MM-DD"));
    });

    this.setState({
      selectedMarkers: this.getCoordinates(filteredMarkers),
      selectedDate: date
    });
  }

  handleDateChange(date) {
    this.selectMarkers(this.state.markers, date);
  }

  componentWillMount() {
    this.selectMarkers(this.state.markers);
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
