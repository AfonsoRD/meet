import React, { Component } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import './nprogress.css';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { InfoAlert } from './Alert';

class App extends Component {
  state = {
    events: [],
    locations: [],
    selectedLocation: 'all',
    eventCount: 32,
    showWelcomeScreen: undefined,
    infoText: ''
  };

  networkStatus = () => {
    this.setState({
      infoText: navigator.onLine ? 'Status: online' : 'Status: offline'
    });
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    this.setState({ showWelcomeScreen: !(code || isTokenValid) });

    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }

    window.addEventListener('online', this.networkStatus);
    window.addEventListener('offline', this.networkStatus);
    this.networkStatus();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, inputNumber) => {
    const { eventCount, selectedLocation } = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents =
          location === 'all'
            ? events
            : events.filter((event) => event.location === location);
        const eventsToShow = locationEvents.slice(0, eventCount);

        this.setState({
          events: eventsToShow,
          selectedLocation: location
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          selectedLocation === 'all'
            ? events
            : events.filter((event) => event.location === selectedLocation);
        const eventsToShow = locationEvents.slice(0, inputNumber);
        this.setState({
          events: eventsToShow,
          eventCount: inputNumber
        });
      });
    }
  };

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(', ').shift();
      return { city, number };
    });
    return data;
  };

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className='App' />;

    const { locations, eventCount, events, showWelcomeScreen } = this.state;
    return (
      <div className='App'>
        <div className='alert-status'>
          <InfoAlert text={this.state.infoText} />
        </div>
        <div className='top-bar'>
          <h1 className='app-tittle'>LEET - Learn and Meet App</h1>
          <div className='city-search-field'>
            <CitySearch
              locations={locations}
              updateEvents={this.updateEvents}
            />
            <NumberOfEvents
              eventCount={eventCount}
              updateEvents={this.updateEvents}
            />
          </div>
        </div>

        <div className='events'>
          <ResponsiveContainer height={400}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis
                type='category'
                dataKey='city'
                name='city'
              />
              <YAxis
                type='number'
                dataKey='number'
                name='number of events'
                allowDecimals={false}
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter
                data={this.getData()}
                fill='#40E0FD'
              />
            </ScatterChart>
          </ResponsiveContainer>

          <EventList events={events} />
        </div>
        <WelcomeScreen
          showWelcomeScreen={showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;
