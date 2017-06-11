import React from 'react';
import { AsyncStorage, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Container, Content, Spinner, Header, Body, Title, Thumbnail, List, ListItem, Left, Right, Icon } from 'native-base';

import { reset_login, addCounter, fetchUser, removeInterest } from '../actions';

class Profile extends React.Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  onLogout() {
    const keys = ['token', '_id'];
    AsyncStorage.multiRemove(keys, (err) => {
      Actions.signin();
      this.props.addCounter();
      this.props.reset_login()
    });
  }

  render() {
    if (this.props.user.username === '' || this.props.user.username === null || this.props.user.username === undefined) {
      return (
        <Container>
          <Content>
            <Spinner color="green" />
          </Content>
        </Container>
      );
    }
    return (
      <Container>
        <Header>
          <Body>
            <Title>Profile</Title>
          </Body>
        </Header>
        <Content>
          <List contentContainerStyle={{ padding: 20, alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <Body style={{ paddingTop: 20 }}>
              <Thumbnail size={80} source={ require('../assets/profile/user_profile_female.png')} />
              <Text>{this.props.user.username}</Text>
              <Text note onPress={() => this.onLogout()}>Logout</Text>
            </Body>
          </List>
          <List
            style={{ paddingTop: 10 }}
            dataArray={this.props.user.interestArr}
            renderRow={item =>
            (<ListItem avatar key={item.id}>
              <Left>
                <Thumbnail square source={{ uri: `http://loremflickr.com/320/240/${item.cuisine_name},food/all` }} />
              </Left>
              <Body>
                <Text >{item.cuisine_name}</Text>
                <Text note> </Text>
              </Body>
              <Right>
                <TouchableOpacity
                  onPress={() => { this.props.removeInterest(item, this.props.user); }}>
                  <Icon name="trash" style={{ color: '#F03861' }} />
                </TouchableOpacity>
              </Right>
            </ListItem>)}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.UserReducer,
  interests: state.interests,
});
const mapDispatchToProps = dispatch => ({
  reset_login: () => dispatch(reset_login()),
  addCounter: () => dispatch(addCounter()),
  fetchUser: () => dispatch(fetchUser()),
  removeInterest: (interest, user) => dispatch(removeInterest(interest, user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
