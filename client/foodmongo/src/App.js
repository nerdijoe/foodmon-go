import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Animated,
  Text,
} from 'react-native';
import { Container, Content, Fab, Button, Icon, Footer, Body } from 'native-base';
import { Router, Scene } from 'react-native-router-flux';

import Map from './components/Map';
import FooterTabs from './components/FooterTabs';
import SignUp from './components/SignUp';

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  container: {

  },
  footertabs: {

  },
  myDrawer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
});


export default class App extends Component {

  render() {
    return (

      <Container style={styles.container}>

        <Router>
          <Scene key="map" component={Map} title="Map" hideNavBar={true} initial={true} />
          <Scene key="signup" component={SignUp} title="Sign Up" />
        </Router>

        <FooterTabs style={styles.footertabs} />

      </Container>

    );
  }
}
