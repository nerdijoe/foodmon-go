import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import {
  Container,
} from 'native-base';
import { Router, Scene } from 'react-native-router-flux';

import Map from './components/Map';
import FooterTabs from './components/FooterTabs';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

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
          <Scene key="signin" component={SignIn} title="Sign In" />
        </Router>

        <FooterTabs style={styles.footertabs} />

      </Container>

    );
  }
}
