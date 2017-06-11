import MapView from 'react-native-maps';
import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { Container } from 'native-base';

import Recommendation from './Recommendation';
import navigation from '../assets/map/navigation.png';
import { fetchZomato } from '../actions';

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
    // height: '90%',
    // width: '100%',
    // flex: 1,

  },

});

class Map extends Component {
  constructor() {
    super();
    this.state = {
      markers: [],
      restaurants: [],
      region: new MapView.AnimatedRegion({
        latitude: 6,
        longitude: 106,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }),
      active: 'true',
    };
  }

  componentWillMount() {
    navigator.geolocation.watchPosition((position) => {
      const region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5,
      };
      this.onRegionChange(region, position.coords.accuracy);
      this.setState({
        markers: [{
          id: 1,
          latlng: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          title: 'Test',
          description: 'Test',
        }],
      });
      this.props.fetchZomato(position.coords.latitude, position.coords.longitude)
    });
  }

  onRegionChange(region, gpsAccuracy) {
    this.setState({
      region,
      gpsAccuracy: gpsAccuracy || this.state.gpsAccuracy,
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <MapView.Animated
          style={styles.map}
          region={this.state.region}
        >
          {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.id}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              image={navigation}
            />
          ))}
          {this.props.restaurants.map(restaurant => (
            <Recommendation
              key={restaurant.restaurant.id}
              restaurant={restaurant.restaurant}
            />
          ))}
        </MapView.Animated>
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
