/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import MapView from 'react-native-maps';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  View
} from 'react-native';
import axios from 'axios'

import navigation from './src/assets/map/navigation.png'

export default class foodmongo extends Component {
  constructor() {
    super()
    this.state= {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      markers: [],
      restaurants: [],
    }
  }

  componentDidMount() {
   navigator.geolocation.getCurrentPosition(
     (position) => {
       var initialPosition = position;
       this.setState({initialPosition});
       console.log(initialPosition);
       this.setState({
         markers: [{
           latlng: {
             latitude: this.state.initialPosition.coords.latitude,
             longitude: this.state.initialPosition.coords.longitude
           },
           title: 'Test',
           description: 'Test'
         }]
       })
     },
     (error) => alert(JSON.stringify(error)),
     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
   );
   navigator.geolocation.watchPosition((position) => {
     var lastPosition = position;
     this.setState({lastPosition});
     console.log(lastPosition);
     this.setState({
       markers: [{
         latlng: {
           latitude: this.state.lastPosition.coords.latitude,
           longitude: this.state.lastPosition.coords.longitude
         },
         title: 'Test',
         description: 'Test'
       }]
     })
   });
   const that=this
   axios.get('https://developers.zomato.com/api/v2.1/geocode?lat=-6.26091&lon=106.781', {
     headers: {
       user_key: '2b958b1e249a2a26c68081cafe451194'
     }
   }).then(res=>{
     that.setState({
       restaurants: res.data.nearby_restaurants
     })
     console.log(that.state.restaurants);
   })

 }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: -6.2609076,
            longitude: 106.7814521,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0050,
          }}
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
          <MapView.Marker
          coordinate={{latitude: Number(restaurant.restaurant.location.latitude), longitude: Number(restaurant.restaurant.location.longitude)}}
          title={restaurant.restaurant.name}
          description={restaurant.restaurant.location.address}
          />
        ))}
        </MapView>
      </View>
    );
  }
}

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

AppRegistry.registerComponent('foodmongo', () => foodmongo);
