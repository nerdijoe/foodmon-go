import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { Container, Text, Content, Item, Input, Label, Button, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { signin, addCounter } from '../actions';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }


  onLogin() {
    this.props.signin(this.state);
    Actions.profile()
  }

  onSignUp() {
    Actions.signup()
    this.props.addCounter();
  }

  render() {
    // console.log('login',this.props.userLogin)
    return (
      <Container style={{ backgroundColor: '#F0F0F0', padding: 20 }} >
        <Content>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={username => this.setState({ username })} />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input onChangeText={password => this.setState({ password })} />
            </Item>
            <Button style={{ padding: 20 }} rounded success
              onPress={() => this.onLogin()}
            ><Text>Sign In</Text>
            </Button>
            <Text style={{ paddingTop: 50, fontSize: 15, color: 'blue', }} onPress={() => this.onSignUp() }>Dont have an account? Sign Up</Text>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
	userLogin: state
})

const mapDispatchToProps = dispatch => ({
  signin: (data) => dispatch(signin(data)),
  addCounter: () => { dispatch(addCounter()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
