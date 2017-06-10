import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import { addCounter, subtractCounter, resetCounter } from '../actions'

class FooterTabs extends Component {

  onPressHandler = (key) => {
    console.log(`onPress ${key}`)
    // Actions.map({type: "reset"})
    if (key === 'map') {
      console.log('nav_counter=', this.props.nav_counter);
      if (this.props.nav_counter > 1) {
        Actions.pop({ popNum: this.props.nav_counter });
      } else {
        Actions.pop();
      }
      this.props.resetCounter();
    } else if (key === 'signup') {
      Actions.signup();
    } else if (key === 'auth') {
      console.log('nav_counter=', this.props.nav_counter);

      AsyncStorage.getItem('token', (err, result) => {
        if (result) {
          Actions.profile();
        } else {
          Actions.signin();
        }
        // Actions.signin();
      });
      this.props.addCounter();
    } else if (key === 'interests') {
      this.props.addCounter();
      Actions.interests();
    } else if (key === 'signin') {
      Actions.signin();
    } else {
      Actions.map();
    }
  }

  render() {
    return (
      <Footer >
        <FooterTab>
          <Button active vertical onPress={() => { this.onPressHandler('map'); }}>
            <Icon active name="navigate" />
            <Text>Explore</Text>
          </Button>
          <Button vertical onPress={() => { this.onPressHandler('interests'); }}>
            <Icon name="apps" />
            <Text>Interests</Text>
          </Button>
          <Button vertical>
            <Icon name="camera" />
            <Text>Camera</Text>
          </Button>
          <Button vertical onPress={() => { this.onPressHandler('auth'); }}>
            <Icon name="person" />
            <Text>Sign Up</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nav_counter: state.NavReducer.counter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCounter: () => { dispatch(addCounter()); },
    subtractCounter: () => { dispatch(subtractCounter()); },
    resetCounter: () => { dispatch(resetCounter()); },
  };
};

const connectedFooterTabs = connect(mapStateToProps, mapDispatchToProps)(FooterTabs);
export default connectedFooterTabs;
