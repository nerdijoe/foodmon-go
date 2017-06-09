import React from 'react';
import { AsyncStorage, Text, Button, View } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { reset_login } from '../actions';

class Profile extends React.Component {

  onLogout() {
    let keys = ['Token', 'Username', '_id'];
    AsyncStorage.multiRemove(keys, (err) => {
      Actions.signin();
      this.props.reset_login()
      console.log('profile', this.props.username)
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
const mapDispatchToProps = dispatch => ({
  reset_login: () => dispatch(reset_login()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
