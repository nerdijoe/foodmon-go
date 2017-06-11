import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import { addCounter, subtractCounter, resetCounter } from '../actions'

class FooterTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'map',
    };
  }

  onPressHandler = (key) => {
    console.log(`onPress ${key}`)


    if (key === 'map') {
      console.log('nav_counter=', this.props.nav_counter);
      if (this.props.nav_counter > 1) {
        Actions.pop({ popNum: this.props.nav_counter });
      } else {
        Actions.pop();
      }
      this.props.resetCounter();
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
      console.log('*** FooterTab Actions.currentRouter.currentRoute=', Actions)

      if (this.state.selectedTab !== key) {
        this.props.addCounter();
      }
    } else if (key === 'interests') {
      if (this.state.selectedTab !== key) {
        this.props.addCounter();
      }
      Actions.interests();
    } else {
      Actions.map();
    }

    this.setState({ selectedTab: key });
  }


  render() {
    return (
      <Footer >
        <FooterTab>
          <Button active={this.state.selectedTab === 'map'} vertical onPress={() => { this.onPressHandler('map'); }}>
            <Icon name="navigate" />
            <Text>Explore</Text>
          </Button>
          <Button active={this.state.selectedTab === 'interests'} vertical onPress={() => { this.onPressHandler('interests'); }}>
            <Icon name="apps" />
            <Text>Interests</Text>
          </Button>
          <Button vertical>
            <Icon name="camera" />
            <Text>Camera</Text>
          </Button>
          <Button active={this.state.selectedTab === 'auth'} vertical onPress={() => { this.onPressHandler('auth'); }}>
            <Icon name="person" />
            <Text>Sign In</Text>
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
