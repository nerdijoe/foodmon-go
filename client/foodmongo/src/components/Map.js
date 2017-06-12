import MapView from 'react-native-maps';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Spinner } from 'native-base';
import SpeechNotification from 'react-native-speech-notification';
import SpeechAndroid from 'react-native-android-voice';

import Recommendation from './Recommendation';
import UserLocation from './UserLocation';
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
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
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

  async getSpeech() {
    try {
      // More Locales will be available upon release.
      const spokenText = await SpeechAndroid.startSpeech('Speak yo', SpeechAndroid.INDONESIAN);
      ToastAndroid.show(spokenText, ToastAndroid.LONG);

      SpeechNotification.speak({
        message: spokenText,
        language: 'id-ID',
      });
      // put logic here
      const input = spokenText.match(/\d/);
      console.log(`input=${input}`);

      const number = input[0];
      console.log(`number='${number}'`);

      // format message
      const restaurant = this.props.restaurants[number - 1].restaurant;
      const message = `oke bos, mari kita memulai navigasi ke ${number}. ${restaurant.name}`;
      console.log(`message='${message}'`);
      SpeechNotification.speak({
        message,
        language: 'id-ID',
      });
    } catch (error) {
      switch (error) {
        case SpeechAndroid.E_VOICE_CANCELLED:
          ToastAndroid.show('Voice Recognizer cancelled', ToastAndroid.LONG);
          break;
        case SpeechAndroid.E_NO_MATCH:
          ToastAndroid.show('No match for what you said', ToastAndroid.LONG);
          break;
        case SpeechAndroid.E_SERVER_ERROR:
          ToastAndroid.show('Google Server Error', ToastAndroid.LONG);
          break;
        /* And more errors that will be documented on Docs upon release */
      }
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

  startSpeaking() {
    console.log('startSpeaking', this);

    let message = 'Di sekitar anda, ada restoran: ';
    let index = 1;
    this.props.restaurants.map(item => {
      message += `${index} ${item.restaurant.name} ,`;
      index += 1;
    });
    message += 'Kamu mau pilih yang mana, bos?';
    console.log(`message '${message}'`);

    SpeechNotification.speak({
      message,
      language: 'id-ID',
    });

    // SpeechNotification.notify({
    //   title: 'IKU',
    //   icon: 'icon',
    // // {icon}.png/.jpg must be present in each
    // //   corresponding android/app/src/main/res/drawable-*dpi/ folders
    //   message: '',
    //   language: 'en-US',
    // });
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


        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.bubble, styles.button]}
            onPress={() => { this.startSpeaking(); }}
          >
            <Text>iku</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bubble, styles.button]}
            onPress={() => { this.getSpeech(); }}
          >
            <Text>iki</Text>
          </TouchableOpacity>
        </View>

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
