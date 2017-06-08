import MapView from 'react-native-maps';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import axios from 'axios';
import { Container, Content } from 'native-base';

import Recommendation from './components/Recommendation';
import navigation from './assets/map/navigation.png';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default class App extends Component {
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
    };
  }

  componentDidMount() {
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
          latlng: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          title: 'Test',
          description: 'Test',
        }],
      });
    });
  }

  onRegionChange(region, gpsAccuracy) {
    this.setState({
      region,
      gpsAccuracy: gpsAccuracy || this.state.gpsAccuracy,
    });
    const that = this;
    console.log(region);
    axios.get(`https://developers.zomato.com/api/v2.1/geocode?lat=${region.latitude.toString()}&lon=${region.longitude.toString()}`, {
      headers: {
        user_key: '2b958b1e249a2a26c68081cafe451194',
      },
    }).then((res) => {
      that.setState({
        restaurants: res.data.nearby_restaurants,
      });
      console.log(that.state.restaurants);
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
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              image={navigation}
            />
          ))}
          {this.state.restaurants.map(restaurant => (
            <Recommendation
              key={restaurant.restaurant.name}
              restaurant={restaurant.restaurant}
            />
          ))}
        </MapView.Animated>
      </Container>
    );
  }
}
