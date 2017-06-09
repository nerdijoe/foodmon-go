import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { Container, Text, Content, Item, Input, Label, Button, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { signin } from '../actions';


class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.userLogin.UserReducer.login.token != '') {
      AsyncStorage.setItem('Token', JSON.stringify(this.props.userLogin.UserReducer.login.token), () => {
        AsyncStorage.setItem('Username', JSON.stringify(this.props.userLogin.UserReducer.login.username), () => {
          AsyncStorage.setItem('_id', JSON.stringify(this.props.userLogin.UserReducer.login._id), () => {
            AsyncStorage.getItem('Token', (err, result) => {
              console.log('signin', result)
              if(result == '') {
                Actions.signin()
              } else {
                Toast.show({
                  text: 'Login Successfully !',
                  position: 'bottom',
                  buttonText: 'Okay',
                  type: 'success',
                });
                Actions.profile()
              }
            });
          });
        });
      });
    } 

  }

  onLogin() {
    this.props.signin(this.state);
  }

  onSignUp() {
    Actions.signup()
  }

  render() {
    // console.log('login',this.props.userLogin)
    return (
      <Container style={{ backgroundColor: '#F0F0F0', padding: 20 }} >
        <Content>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={(username) => this.setState({username})}
              value={this.state.username}/>
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input onChangeText={(password) => this.setState({password})}
              value={this.state.password}/>
            </Item>
            <Button style={{ padding: 20 }} rounded success
              onPress={() => this.onLogin()}
            ><Text>Sign In</Text>
            </Button>
            <Text style={{ paddingTop: 50, fontSize: 15, color: 'blue', }} onPress={() => this.onSignUp() }>Don't have account, Sign Up</Text>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
