import MapView from 'react-native-maps';
import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Spinner } from 'native-base';

import Recommendation from './Recommendation';
import UserLocation from './UserLocation';
import { fetchZomato } from '../actions';
import ButtonVoice from './ButtonVoice';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

var currentPosition

class Map extends Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      region: {
        latitude: -6.195024,
        longitude: 106.823006,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5,
      },
    };
  }

  componentWillMount() {
    const that = this;
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5,
      };
      that.onRegionChange(region, position.coords.accuracy);
      that.props.fetchZomato(position.coords.latitude, position.coords.longitude);
    });
  }

  componentDidMount() {
    const that = this;
    currentPosition = setInterval(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.00922 * 1.5,
            longitudeDelta: 0.00421 * 1.5,
          };
          that.onRegionChange(region, position.coords.accuracy);
        });
    }, 300)
    navigator.geolocation.watchPosition((position) => {
      that.props.fetchZomato(position.coords.latitude, position.coords.longitude);
    });
  }

  componentWillUnmount() {
    clearInterval(currentPosition);
  }

  onRegionChange(region, gpsAccuracy) {
    if (
      this.state.region.latitude !== region.latitude ||
      this.state.region.longitude !== region.longitude
    ) {
      this.setState({
        region,
        gpsAccuracy: gpsAccuracy || this.state.gpsAccuracy,
      });
    }
  }

  stopMoving() {
    clearInterval(currentPosition);
  }

  continueMoving() {
    const that = this;
    currentPosition = setInterval(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.00922 * 1.5,
            longitudeDelta: 0.00421 * 1.5,
          };
          that.onRegionChange(region, position.coords.accuracy);
        });
    }, 300)
  }

  render() {
    return (
      <Container style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          onMarkerSelect={() => { this.stopMoving(); }}
          onMarkerDeselect={() => { this.continueMoving(); }}
        >
          <UserLocation region={this.state.region}/>
          {this.props.restaurants.map(restaurant => (
            <Recommendation
              key={restaurant.restaurant.id}
              restaurant={restaurant.restaurant}
            />
          ))}

        </MapView>

        <ButtonVoice />

      </Container>
    );
  }
}

const mapStateToProps = state => ({
  restaurants: state.restaurants,
});

const mapDispatchToProps = dispatch => ({
  fetchZomato: (latitude, longitude) => dispatch(fetchZomato(latitude, longitude)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
