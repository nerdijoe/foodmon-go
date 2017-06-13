import React from 'react';
import { AsyncStorage, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Container, Content, Spinner, Header, Body, Title, Thumbnail, List, ListItem, Left, Right, Icon, Button, H3 } from 'native-base';

import { reset_login, addCounter, fetchUser, removeInterest } from '../actions';

export class Profile extends React.Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  onLogout() {
    const keys = ['token', '_id'];
    AsyncStorage.multiRemove(keys, (err) => {
      Actions.signin();
      this.props.addCounter();
      this.props.reset_login();
    });
  }

  handleListInterests() {
    if(this.props.user.interestArr.length == 0){
      return (<Text style={{ padding: 20, textAlign: 'center' }}>Empty Interest list, you can add it in the interest menu</Text>);
    } else {
      return (
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
                <Icon name="md-close" style={{ color: '#F03861' }} />
              </TouchableOpacity>
            </Right>
          </ListItem>)}
        />
      )
    }
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
                <Button small bordered style={{ marginTop: 5 }}>
                  <Text note onPress={() => this.onLogout()} style={{ margin: 0, fontSize: 12 }}>Logout</Text>
                </Button>

            </Body>
          </List>
          <H3 style={{ paddingLeft: 20, fontSize: 14 }}>Interests</H3>
          {this.handleListInterests()}
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
