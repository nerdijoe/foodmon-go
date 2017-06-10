import React from 'react';
import { AsyncStorage, Button } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Container, Content, Spinner, Header, Body, Title, Text, Thumbnail, List, ListItem, Left } from 'native-base';

import { reset_login, addCounter, fetchUser } from '../actions';
// import profileUser from '../assets/profile/user_profile_female.jpg';

class Profile extends React.Component {

  onLogout() {
    let keys = ['Token', 'Username', '_id'];
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
    console.log('props', this.props.user)
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
      <Container>
        <Header>
          <Body>
            <Title>Profile</Title>
          </Body>
        </Header>
        <Content>
          <List contentContainerStyle={{ padding: 20, alignItems: 'center', flex: 1, justifyContent: 'center'}}>
            <Body style={{ paddingTop: 20 }}>
              <Thumbnail size={80} source={require('../assets/profile/user_profile_female.png')} />
              <Text>{this.props.user.username}</Text>
              <Text note onPress={() => this.onLogout()}>Logout</Text>
            </Body>
          </List>
          {this.props.user.interestArr.map((item, index) =>
           (
          <ListItem avatar key={index}>
              <Left>
                <Thumbnail square source={require('../assets/profile/user_profile_female.png')} />
              </Left>
              <Body>
                <Text>{item.cuisine_name}</Text>
                <Text note>...</Text>
              </Body>
          </ListItem>
          ))}
        </Content>
      </Container>
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
