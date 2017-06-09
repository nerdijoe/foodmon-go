import React from 'react';
import { AsyncStorage, Text, Button, View } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class Profile extends React.Component {


  onLogout() {
    let keys = ['Token'];
    AsyncStorage.multiRemove(keys, (err) => {
      Actions.signin();
    });
  }

  render() {
    return (
      <View>
        <Text>Profile</Text>
        <Text>Welcome, {this.props.username.UserReducer.login.username}</Text>
        <Text onPress={() => this.onLogout()}>Logout</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
	username: state
})

export default connect(mapStateToProps, null)(Profile);
