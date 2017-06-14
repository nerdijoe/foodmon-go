import React, { Component } from 'react';
import {
  AsyncStorage, StatusBar,
} from 'react-native';
import {
  Container,
} from 'native-base';
import { Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Map from './components/Map';
import FooterTabs from './components/FooterTabs';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import InterestsList from './components/InterestsList';
import Swiper from './components/Swiper';
import { fetch_login, fetchUser, fetchInterests } from './actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchInterests();
    AsyncStorage.getItem('token', (err1, token) => {
      console.log('app.js componentDidMount', token);
      if (token) {
        this.props.fetchUser();
      }
    });
  }

  render() {
    return (
      <Container>
        <StatusBar
          backgroundColor="#FFCD38"
          barStyle="dark-content"
        />
        <Router>
          <Scene key="map" component={Map} title="Map" hideNavBar initial />
          <Scene key="interests" component={InterestsList} title="Interests" />
          <Scene key="signup" component={SignUp} title="Sign Up" />
          <Scene key="signin" component={SignIn} title="Sign In" />
          <Scene key="profile" component={Profile} title="Profile" />
          <Scene key="swiper" component={Swiper} title="Swiper" />
        </Router>
        <FooterTabs />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = dispatch => ({
  fetch_login: data => dispatch(fetch_login(data)),
  fetchUser: () => dispatch(fetchUser()),
  fetchInterests: () => dispatch(fetchInterests()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
