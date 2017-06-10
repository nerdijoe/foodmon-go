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
    // Actions.map({type: "reset"})
    this.setState({ selectedTab: key })

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

      AsyncStorage.getItem('Token', (err, result) => {
        if (result) {
          Actions.profile();
        } else {
          Actions.signin();
        }
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
        <FooterTab style={{backgroundColor: '#ff5f2e'}} tabActiveBgColor="#fcbe32" >
          <Button active={this.state.selectedTab === 'map'} vertical onPress={() => { this.onPressHandler('map'); }}>
            <Icon active name="navigate" />
            <Text>Explore</Text>
          </Button>
          <Button active={this.state.selectedTab === 'interests'} vertical onPress={() => { this.onPressHandler('interests'); }}>
            <Icon name="apps" style={styles.iconText} />
            <Text style={{ color: '#FFFFF2' }}>Interests</Text>
          </Button>
          <Button vertical>
            <Icon name="camera" />
            <Text>something</Text>
          </Button>
          <Button active={this.state.selectedTab === 'auth'} vertical onPress={() => { this.onPressHandler('auth'); }}>
            <Icon name="person" />
            <Text>Sign Up</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

const styles = {
  iconText: {
    color: '#FFFFF2',
  },
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
