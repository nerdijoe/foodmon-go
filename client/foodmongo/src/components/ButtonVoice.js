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
      // ToastAndroid.showWithGravity('All Your Base Are Belong To Us', ToastAndroid.SHORT, ToastAndroid.CENTER);

      // SpeechNotification.speak({
      //   message: spokenText,
      //   language: 'id-ID',
      // });

      let message = '';
      if (spokenText.match(/[\d]+/)) {
        const input = spokenText.match(/[\d]+/);
        console.log(`input=${input}`);

        const number = input[0];
        console.log(`number='${number}'`);

        if (number - 1 > this.props.restaurants.length) {
          message = `Maaf bos, pilihan anda salah.`;
          SpeechNotification.speak({
            message,
            language: 'id-ID',
          });
        } else {
          // format message
          const restaurant = this.props.restaurants[number - 1].restaurant;
          // message = `oke bos, ini caranya menuju ke ${number}. ${restaurant.name}`;
          // console.log(`message='${message}'`);
          // SpeechNotification.speak({
          //   message,
          //   language: 'id-ID',
          // });

          console.log('===> userPosition=', this.props.userPosition);
          // this.getDirections(`${this.props.userPosition.latitude}, ${this.props.userPosition.longitude}`, `${restaurant.location.latitude}, ${restaurant.location.longitude}`);
          this.getDirectionsV2(number, restaurant);
        }

      } else if (spokenText.match(/batal/)) {
        // clear polyline
        this.props.updateCoordinates([]);
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

  async getDirectionsV2(number, restaurant) {
    const startLoc = `${this.props.userPosition.latitude}, ${this.props.userPosition.longitude}`;
    const destinationLoc = `${restaurant.location.latitude}, ${restaurant.location.longitude}`;
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

      let totalDuration = Math.floor(respJson.routes[0].legs[0].duration.value / 60);
      console.log(`totalDuration: `, totalDuration);

      this.setState({
        isGetDirections: true,
        totalDuration,
      });

      let message = `oke bos, ini caranya menuju ke ${number}. ${restaurant.name}`;
      console.log(`message='${message}'`);
      SpeechNotification.speak({
        message,
        language: 'id-ID',
      });


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
        <Button rounded
          style={{ backgroundColor: '#4A4A4A', margin: 5 }}
          onPress={() => { this.startSpeaking(); }}
        >
          <Icon name="md-megaphone" style={{ color: '#FFCD38' }} />
        </Button>

        <Button rounded
          style={{ backgroundColor: '#4A4A4A', margin: 5 }}
          onPress={() => { this.getSpeech(); }}
        >
          <Icon name="md-mic" style={{ color: '#FFCD38' }} />
        </Button>
        <Button light rounded><Text>{this.state.totalDuration}</Text></Button>
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
