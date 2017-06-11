import React, { Component } from 'react';
import {
  StyleSheet, AsyncStorage, StatusBar,
} from 'react-native';
import {
  Container,
} from 'native-base';
import { Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Map from './components/Map';
import FooterTabs from './components/FooterTabs';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import InterestsList from './components/InterestsList';
import { fetch_login, fetchUser, fetchInterests } from './actions';

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  myDrawer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
});


class App extends Component {
  // componentWillMount() {
  //   if(this.props.username.UserReducer.login.token == ''){
  //     AsyncStorage.getItem('Token', (err, token) => {
  //       AsyncStorage.getItem('Username', (err, username) => {
  //         AsyncStorage.getItem('_id', (err, _id) => {
  //           this.props.fetch_login({ username: username, token: token, _id: _id})
  //           console.log('app', this.props.username.UserReducer.login)
  //         });
  //       });
  //     });
  //   } else {
  //     Actions.map()
  //   }
  // }
  componentDidMount() {
    AsyncStorage.getItem('token', (err1, token) => {
      console.log('app.js componentDidMount', token)
      if(token) {
        this.props.fetchUser()
        this.props.fetchInterests();
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
          <Scene key="map" component={Map} title="Map" hideNavBar={true} initial={true} />
          <Scene key="interests" component={InterestsList} title="Interests" />
          <Scene key="signup" component={SignUp} title="Sign Up" />
          <Scene key="signin" component={SignIn} title="Sign In" />
          <Scene key="profile" component={Profile} title="Profile" />
        </Router>

        <FooterTabs />

      </Container>

    );
  }
}

const mapStateToProps = state => ({
	state: state,
})

const mapDispatchToProps = dispatch => ({
  fetch_login: (data) => dispatch(fetch_login(data)),
  fetchUser: () => dispatch(fetchUser()),
  fetchInterests: () => dispatch(fetchInterests()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
