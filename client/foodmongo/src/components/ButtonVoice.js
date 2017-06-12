import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import SpeechNotification from 'react-native-speech-notification';
import SpeechAndroid from 'react-native-android-voice';

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
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

class ButtonVoice extends Component {
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
        default: break;
      }
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
    );
  }
}

const mapStateToProps = state => ({
  restaurants: state.restaurants,
});

const connectedButtonVoice = connect(mapStateToProps, null)(ButtonVoice);
export default connectedButtonVoice;
