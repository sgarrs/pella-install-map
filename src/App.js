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
      selectedBranch: 'ALL'
    }
    this.handleDateChange = this.handleDateChange.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.selectMarkers = this.selectMarkers.bind(this);
    this.selectBranch = this.selectBranch.bind(this);
    this.createBranchFilterButton = this.createBranchFilterButton.bind(this);

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

  selectMarkers(markers, date = this.state.selectedDate) {
    const filteredMarkers = markers.filter((marker) => {
      return (this.state.selectedBranch === 'ALL' ? true : this.state.selectedBranch === marker.branch)
        && date.isSameOrAfter(moment(marker.installStart))
        && date.isSameOrBefore(moment(marker.installEnd));
    });

    Promise.all(this.getCoordinates(filteredMarkers))
      .then((filteredMarkersWithCoords) => {
        this.selectedMarkers = filteredMarkersWithCoords; // because setState is async, we can't render markers correctly if lat/lng props come from state
        this.setState({ selectedDate: date });
      })
      .catch(err => console.log(err));
  }

  selectBranch(branch) {
    this.setState({
      selectedBranch: branch
    },
    () => this.selectMarkers(this.state.markers));
  }

  createBranchFilterButton(branch, i) {
    const key = `branch-${i}`;
    return (
      <button
        key={key}
        className={branch === this.state.selectedBranch ? 'selected' : ''}
        onClick={this.selectBranch.bind(this, branch)}
      >
        {branch}
      </button>
    );
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
          <div className="ControlPanel">
            <p className="instruction">Filter by branch:</p>
            <div className="BranchFilter">
              {['GA', 'TN', 'ALL'].map((branch, i) => this.createBranchFilterButton(branch, i))}
            </div>
            <p className="instruction">Select date:</p>
            <DatePicker
              selected={this.state.selectedDate}
              onChange={this.handleDateChange}
              className='pella-datepicker'
            />
          </div>
          <EventInfo events={this.selectedMarkers} />
        </div>
      </div>
    );
  }
}

export default App;
