import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ToastAndroid,
} from 'react-native';
import { Button, Icon } from 'native-base';

import { connect } from 'react-redux';
import SpeechNotification from 'react-native-speech-notification';
import SpeechAndroid from 'react-native-android-voice';
import Polyline from '@mapbox/polyline';

import { updateCoordinates } from '../actions';

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  InformationContainer: {
    flexDirection: 'row',
    margin: 5,
  },
  bubbleInformation: {
    backgroundColor: 'rgba(255, 205, 56, 0.9)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  item: {
    flexDirection: 'row',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 5,
    backgroundColor: 'transparent',
  },
  buttonBase: {
    borderRadius: 20,
  },
});

class ButtonVoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGetDirections: false,
      totalDuration: 0,
      totalDistance: 0,
    };
  }

  async getSpeech() {
    try {
      // More Locales will be available upon release.
      const spokenText = await SpeechAndroid.startSpeech('Speak', SpeechAndroid.INDONESIAN);
      ToastAndroid.show(spokenText, ToastAndroid.LONG);

      let message = '';
      if (spokenText.match(/[\d]+/)) {
        const input = spokenText.match(/[\d]+/);
        console.log(`input=${input}`);

        const number = input[0];
        console.log(`number='${number}'`);

        if (number - 1 >= this.props.restaurants.length) {
          message = `Maaf bos, restoran nomor ${number} tidak ada.`;
          SpeechNotification.speak({
            message,
            language: 'id-ID',
          });
        } else {
          const restaurant = this.props.restaurants[number - 1].restaurant;
          console.log('===> userPosition=', this.props.userPosition);
          this.getDirectionsV2(number, restaurant);
        }
      } else if (spokenText.match(/batal/)) {
        // clear polyline and information bubble
        this.clearDirAndInformation();
      } else if (spokenText.match(/iku/)) {
        message = 'Pancasila.. 1. Ketuhanan Yang Maha Esa, 2. kemanusiaan yang adil dan beradab, 3. persatuan Indonesia, 4. kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan, 5. keadilan sosial bagi seluruh rakyat Indonesia';
        SpeechNotification.speak({
          message,
          language: 'id-ID',
        });
      } else {
        message = `Maaf bos, maksudnya ${spokenText} apa?`;
        SpeechNotification.speak({
          message,
          language: 'id-ID',
        });
      }
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
        default: break;
      }
    }
  }

  async getDirectionsV2(number, restaurant) {
    const startLoc = `${this.props.userPosition.latitude}, ${this.props.userPosition.longitude}`;
    const destinationLoc = `${restaurant.location.latitude}, ${restaurant.location.longitude}`;
    try {
      const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`);
      const respJson = await resp.json();
      const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      const coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });

      this.props.updateCoordinates(coords);

      const totalDuration = Math.floor(respJson.routes[0].legs[0].duration.value / 60);
      console.log(`totalDuration: ${totalDuration}`);

      const totalDistance = (respJson.routes[0].legs[0].distance.value / 1000).toFixed(1);
      console.log(`totalDistance: ${totalDistance}`);

      this.setState({
        isGetDirections: true,
        totalDuration,
        totalDistance,
      });

      const message = `oke bos, ini caranya menuju ke ${number}. ${restaurant.name}`;
      console.log(`message='${message}'`);
      SpeechNotification.speak({
        message,
        language: 'id-ID',
      });

      return coords;
    } catch (error) {
      ToastAndroid.show('Speech to Text Error', ToastAndroid.LONG);
      return error;
    }
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
  }

  clearDirAndInformation() {
    this.setState({
      isGetDirections: false,
      totalDuration: 0,
      totalDistance: 0,
    });
    this.props.updateCoordinates([]);
  }

  showInformation() {
    if (this.state.isGetDirections) {
      return (
        <View style={styles.InformationContainer}>
          <View style={styles.bubbleInformation}>
            <View style={styles.item}>
              <Icon name="md-stopwatch" style={{ color: '#4A4A4A', fontSize: 20 }} />
              <Text> {this.state.totalDuration} min</Text>
            </View>
            <View style={styles.item}>
              <Icon name="md-code-working" style={{ color: '#4A4A4A', fontSize: 20 }} />
              <Text> {this.state.totalDistance} km</Text>
            </View>

          </View>
          <Button
            light
            small
            rounded onPress={() => { this.clearDirAndInformation(); }}
            style={{ paddingHorizontal: 0 }}
          >
            <Icon name="md-close" style={{ color: '#F03861', fontSize: 10 }} />
          </Button>
        </View>
      )
    }

    return (
      <Text></Text>
    )
  }

  render() {
    return (
      <View style={styles.buttonContainer}>
        <Button
          rounded
          style={{ backgroundColor: '#4A4A4A', margin: 5 }}
          onPress={() => { this.startSpeaking(); }}
        >
          <Icon name="md-megaphone" style={{ color: '#FFCD38' }} />
        </Button>

        <Button
          rounded
          style={{ backgroundColor: '#4A4A4A', margin: 5 }}
          onPress={() => { this.getSpeech(); }}
        >
          <Icon name="md-mic" style={{ color: '#FFCD38' }} />
        </Button>
        {this.showInformation()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  restaurants: state.restaurants,
});

const mapDispatchToProps = dispatch => ({
  updateCoordinates: coords => dispatch(updateCoordinates(coords)),
});

const connectedButtonVoice = connect(mapStateToProps, mapDispatchToProps)(ButtonVoice);
export default connectedButtonVoice;
