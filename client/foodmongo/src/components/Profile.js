import React from 'react';
import { AsyncStorage, Text, Button, View } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Container, Content, Spinner } from 'native-base';

import { reset_login, addCounter, fetchUser } from '../actions';

class Profile extends React.Component {

  onLogout() {
    let keys = ['token', '_id'];
    AsyncStorage.multiRemove(keys, (err) => {
      Actions.signin();
      this.props.addCounter();
      this.props.reset_login()
      console.log('profile', this.props.username)
    });
  }

  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    if(this.props.user.username === '' || this.props.user.username === null || this.props.user.username === undefined){
      return (
        <Container>
          <Content>
            <Spinner color="green" />
          </Content>
        </Container>
      )
    }
    return (
      <View>
        <Text>Profile</Text>
        <Text>Welcome, {this.props.user.username}</Text>
        <Text onPress={() => this.onLogout()}>Logout</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.UserReducer,
});
const mapDispatchToProps = dispatch => ({
  reset_login: () => dispatch(reset_login()),
  addCounter: () => dispatch(addCounter()),
  fetchUser: () => dispatch(fetchUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
