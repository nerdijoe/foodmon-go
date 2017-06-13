import MapView from 'react-native-maps';
import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { Container } from 'native-base';

import Recommendation from './Recommendation';
import UserLocation from './UserLocation';
import ButtonVoice from './ButtonVoice';
import RecenterButton from './RecenterButton';
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
  },
});

var currentPosition, currentRegion, watchZomato;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPosition: {
        latitude: -6.195024,
        longitude: 106.823006,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5,
      },
      region: {
        latitude: -6.195024,
        longitude: 106.823006,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5,
      },
      markerClicked: false,
      regionChanged: false,
    };
  }

  componentWillMount() {
    this.getCurrentPosition();
  }

  componentDidMount() {
    this.startMoving();
    this.startWatching();
    this.startCenter();
  }

  componentWillUnmount() {
    clearInterval(currentPosition);
  }

  onRegionChange(region) {
    this.setState({
      region,
    });
  }

  onUserPositionChange(userPosition) {
    this.setState({
      userPosition,
    });
  }

  getCurrentPosition() {
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

  startMoving() {
    const that = this;
    currentPosition = setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const userPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        that.onUserPositionChange(userPosition);
      });
    }, 300);
  }

  startCenter() {
    const that = this
    currentRegion = setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922 * 1.5,
          longitudeDelta: 0.00421 * 1.5,
        };
        that.onRegionChange(region);
      });
    }, 300)
  }

  stopCenter() {
    clearInterval(currentRegion);
  }

  startWatching() {
    const that = this;
    navigator.geolocation.watchPosition((position) => {
      if (this.state.markerClicked === false) {
        that.props.fetchZomato(position.coords.latitude, position.coords.longitude);
      }
    });
  }

  handleMarkerClick(position) {
    this.setState({
      markerClicked: true,
      region: {
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: this.state.region.latitudeDelta,
        longitudeDelta: this.state.region.longitudeDelta,
      }
    });
  }

  reCenterButton() {
    if (this.state.markerClicked || this.state.regionChanged) {
      return (
        <RecenterButton handlePress={() => {
          this.setState({
            markerClicked: false,
            regionChanged: false,
          });
          this.startCenter();
          this.getCurrentPosition();
        }}
        />
      );
    }
  }

  render() {
    return (
      <Container>
        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChange={(e) => {
            this.onRegionChange(e);
            if (this.state.regionChanged === false) {
              this.stopCenter();
              this.setState({
                regionChanged: true,
              })
            }
          }}
        >
          <UserLocation userPosition={this.state.userPosition} />
          {this.props.restaurants.map(restaurant => (
            <Recommendation
              key={restaurant.restaurant.id}
              restaurant={restaurant.restaurant}
              handleClick={() => {
                this.stopCenter();
                this.handleMarkerClick({
                  latitude: Number(restaurant.restaurant.location.latitude)+0.002,
                  longitude: Number(restaurant.restaurant.location.longitude),
                });
              }}
            />
          ))}

          <MapView.Polyline
            coordinates={this.props.coords}
            strokeWidth={2}
            strokeColor="red"
          />

        </MapView>


        <ButtonVoice userPosition={this.state.userPosition} />
        {this.reCenterButton()}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  restaurants: state.restaurants,
  coords: state.directions.coords,
});

const mapDispatchToProps = dispatch => ({
  fetchZomato: (latitude, longitude) => dispatch(fetchZomato(latitude, longitude)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
