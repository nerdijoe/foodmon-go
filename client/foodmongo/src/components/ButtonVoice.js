import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
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

  async getSpeech() {
    try {
      // More Locales will be available upon release.
      const spokenText = await SpeechAndroid.startSpeech('Speak', SpeechAndroid.INDONESIAN);
      ToastAndroid.show(spokenText, ToastAndroid.LONG);
      // ToastAndroid.showWithGravity('All Your Base Are Belong To Us', ToastAndroid.SHORT, ToastAndroid.CENTER);

      SpeechNotification.speak({
        message: spokenText,
        language: 'id-ID',
      });
      // put logic here

      if (spokenText.match(/\d/)) {
        const input = spokenText.match(/\d/);
        console.log(`input=${input}`);

        const number = input[0];
        console.log(`number='${number}'`);

        // format message
        const restaurant = this.props.restaurants[number - 1].restaurant;
        const message = `oke bos, ini caranya menuju ke ${number}. ${restaurant.name}`;
        console.log(`message='${message}'`);
        SpeechNotification.speak({
          message,
          language: 'id-ID',
        });

        console.log('===> userPosition=', this.props.userPosition);
        this.getDirections(`${this.props.userPosition.latitude}, ${this.props.userPosition.longitude}`, `${restaurant.location.latitude}, ${restaurant.location.longitude}`);
      } else if (spokenText.match(/batal/)) {
        // clear polyline
        this.props.updateCoordinates([]);
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

  async getDirections(startLoc, destinationLoc) {
    try {
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`);
      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
          return  {
              latitude : point[0],
              longitude : point[1]
          }
      });

      // this.setState({ coords: coords });
      // call actions
      this.props.updateCoordinates(coords);

      return coords;
    } catch(error) {
      alert(error);
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
      <View style={styles.buttonContainer}>
        <Button
          style={{ borderRadius: 20, backgroundColor: '#4A4A4A', margin: 5 }}
          onPress={() => { this.startSpeaking(); }}
        >
          <Icon name="md-megaphone" style={{ color: '#FFCD38' }} />
        </Button>

        <Button
          style={{ borderRadius: 20, backgroundColor: '#4A4A4A', margin: 5 }}
          onPress={() => { this.getSpeech(); }}
        >
          <Icon name="md-mic" style={{ color: '#FFCD38' }} />
        </Button>
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
