import MapView from 'react-native-maps';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import { Container } from 'native-base';
import SpeechNotification from 'react-native-speech-notification';
import SpeechAndroid from 'react-native-android-voice';

import Recommendation from './Recommendation';
import navigation from '../assets/map/navigation.png';

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

export default class Map extends Component {
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

      const that = this;
      axios.get(`https://developers.zomato.com/api/v2.1/geocode?lat=${position.coords.latitude.toString()}&lon=${position.coords.longitude.toString()}`, {
        headers: {
          user_key: '2b958b1e249a2a26c68081cafe451194',
        },
      }).then((res) => {
        that.setState({
          restaurants: res.data.nearby_restaurants,
        });
        console.log(that.state.restaurants);
      });
    });
  }

  onRegionChange(region, gpsAccuracy) {
    this.setState({
      region,
      gpsAccuracy: gpsAccuracy || this.state.gpsAccuracy,
    });
  }

  startSpeaking() {
    console.log('startSpeaking', this);

    var message = 'Di sekitar anda, ada restoran: ';
    let index = 1;
    this.state.restaurants.map( item => {
      message += `${index} ${item.restaurant.name} ,`
      index++;
    })
    message += "Kamu mau pilih yang mana?"
    console.log("message ", message);

    SpeechNotification.speak({
      message: message,
      language: 'id-ID',
    });

    // SpeechNotification.notify({
    //   title: 'IKU',
    //   icon: 'icon', // {icon}.png/.jpg must be present in each corresponding android/app/src/main/res/drawable-*dpi/ folders
    //   message: '',
    //   language: 'en-US',
    // });
  }


  async getSpeech() {
    try{
      //More Locales will be available upon release.
      var spokenText = await SpeechAndroid.startSpeech("Speak yo", SpeechAndroid.INDONESIAN);
      ToastAndroid.show(spokenText , ToastAndroid.LONG);

      // put logic here
      var input = spokenText.match(/\d/);
      console.log("input=", input);

      var number = input[0];
      console.log(`number='${number}'`)

      // format message
      var restaurant = this.state.restaurants[number - 1].restaurant;
      var message = `oke bos, mari kita memulai navigasi ke ${number}. ${restaurant.name}`
      console.log(`message='${message}'`)
      SpeechNotification.speak({
        message: message,
        language: 'id-ID',
      });

    }catch(error){
      switch(error){
        case SpeechAndroid.E_VOICE_CANCELLED:
            ToastAndroid.show("Voice Recognizer cancelled" , ToastAndroid.LONG);
            break;
        case SpeechAndroid.E_NO_MATCH:
            ToastAndroid.show("No match for what you said" , ToastAndroid.LONG);
            break;
        case SpeechAndroid.E_SERVER_ERROR:
            ToastAndroid.show("Google Server Error" , ToastAndroid.LONG);
            break;
        /*And more errors that will be documented on Docs upon release*/
      }
    }
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
          {this.state.restaurants.map(restaurant => (
            <Recommendation
              key={restaurant.restaurant.id}
              restaurant={restaurant.restaurant}
            />
          ))}
        </MapView.Animated>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.bubble, styles.button]}
            onPress={() => {this.startSpeaking()}}
          >
            <Text>iku</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bubble, styles.button]}
            onPress={() => {this.getSpeech()}}
          >
            <Text>iki</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}
