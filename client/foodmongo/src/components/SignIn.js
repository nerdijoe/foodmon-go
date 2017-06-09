import React from 'react';
import { connect } from 'react-redux';
import { signin } from '../actions';
import { AsyncStorage } from 'react-native'
import { Container, Text, Content, Item, Input, Label, Button } from 'native-base';

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
  }

  render() {
    if(this.props.userLogin.UserReducer.login.token){
      AsyncStorage.setItem('Token', JSON.stringify(this.props.userLogin.UserReducer.login.token), () => {
    	  AsyncStorage.mergeItem('Token', JSON.stringify(this.props.userLogin.UserReducer.login.token), () => {
    	    AsyncStorage.getItem('Token', (err, result) => {
    	      console.log(result);
    	    });
    	  });
    	});
    }
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

            <Text style={{ paddingTop: 50, fontSize: 15, color: 'blue', }} onPress={() => this.onSignUp}>Don't have account, Sign Up</Text>
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
