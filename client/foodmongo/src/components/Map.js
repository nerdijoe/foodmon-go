import MapView from 'react-native-maps';
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Container } from 'native-base';

import Recommendation from './Recommendation';
import UserLocation from './UserLocation';
import ButtonVoice from './ButtonVoice';
import RecenterButton from './RecenterButton';
import { fetchZomato } from '../actions';
import { customStyle } from './MapCustomStyle';

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
  errorHandler: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FFCD38',
    fontWeight: 'bold',
    fontSize: 24,
    margin: 20,
    textAlign: 'center',
  },
});

var currentPosition,
  currentRegion;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: -6.195024,
        longitude: 106.823006,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5,
      },
      markerClicked: false,
      regionChanged: false,
      locationOn: true,
    };
  }

  componentWillMount() {
    this.getCurrentPosition();
  }

  componentDidMount() {
    this.startWatching();
    this.startCenter();
  }

  componentWillUnmount() {
    clearInterval(currentRegion);
  }

  onRegionChange(region) {
    this.setState({
      region,
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
    }, (err) => {
      console.log(err);
    });
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
        if (that.state.locationOn === false) {
          that.setState({
            locationOn: true,
          });
        }
      }, (err) => {
        if (that.state.locationOn === true) {
          that.setState({
            locationOn: false,
          });
        }
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
      if (that.state.locationOn === false) {
        that.setState({
          locationOn: true,
        });
      }
    }, (err) => {
      if (that.state.locationOn === true) {
        that.setState({
          locationOn: false,
        });
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

  handleGPSError() {
    if (this.state.locationOn === false) {
      return (
        <View style={styles.errorHandler}>
          <Text style={styles.errorText}>Please turn on location or check for app permissions</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <Container>

        <MapView
          style={styles.map}
          customMapStyle={customStyle}
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
          showsUserLocation={true}
        >
          {this.props.restaurants.map((restaurant, index) => (
            <Recommendation
              key={restaurant.restaurant.id}
              index={index+1}
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
        {this.handleGPSError()}
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
