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
    }
    this.handleDateChange = this.handleDateChange.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.selectMarkers = this.selectMarkers.bind(this);

    this.selectedMarkers = [];
  }

  getCoordinates(markers) {
    const markersWithCoords = markers.map((marker, i) => {
      const address = marker.address.replace(/\s/g, '+');
      const url = `${GEOCODE_URL}json?address=${address}&key=${API_KEY}`;

      return fetch(url)
        .then((res) => res.json())
        .then((json) => Object.assign({}, marker, json.results[0].geometry.location))
        .catch((err) => console.log(err));
    });

    return markersWithCoords;
  }

  selectMarkers(markers, date = moment()) {
    const filteredMarkers = markers.filter((marker) => {
      return date.isSameOrAfter(moment(marker.installStart, "YYYY-MM-DD"))
        && date.isSameOrBefore(moment(marker.installEnd, "YYYY-MM-DD"));
    });

    Promise.all(this.getCoordinates(filteredMarkers))
      .then((filteredMarkersWithCoords) => {
        this.selectedMarkers = filteredMarkersWithCoords; // because setState is async, we can't render markers correctly if lat/lng props come from state
        this.setState({ selectedDate: date });
      })
      .catch(err => console.log(err));

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
          markers={this.selectedMarkers}
        />
        <div className="sidebar">
          <DatePicker
            selected={this.state.selectedDate}
            onChange={this.handleDateChange}
            className='pella-datepicker'
          />
          <EventInfo events={this.selectedMarkers} />
        </div>
      </div>
    );
  }
}

export default App;
