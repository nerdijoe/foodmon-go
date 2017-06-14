import React from 'react';
import {
  Container,
  Text,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Header,
  Body,
  Title,
} from 'native-base';
import { connect } from 'react-redux';
import { actionSignUp } from '../actions';

const styles = {
  container: {
    backgroundColor: '#F0F0F0',
    flex: 1,
    // justifyContent: 'center',
  },
  header: {
    justifyContent: 'center',
  },
  content: {
    justifyContent: 'center',
  },
  myForm: {
    padding: 20,
  },
  myButton: {
    padding: 10,
    marginLeft: 20,
  },
};

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      username: '',
      password: '',
    };
  }

  handleSignUp() {
    this.props.signUp(this.state);
    // call reducer action for signup
  }

  handleChangeInput(stateName, text) {
    this.setState({
      [stateName]: text,
    });
  }

  render() {
    return (
      <Container style={styles.container} >
        <Header style={styles.header}>
          <Body>
            <Title>Sign Up</Title>
          </Body>
        </Header>

        <Content contentContainerStyle={{ justifyContent: 'center' }} >
          <Form style={styles.myForm}>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input value={this.state.name} onChangeText={(text) => { this.handleChangeInput('name', text); }} />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input value={this.state.email} onChangeText={(text) => { this.handleChangeInput('email', text); }} />
            </Item>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input value={this.state.username} onChangeText={(text) => { this.handleChangeInput('username', text); }} />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry value={this.state.password} onChangeText={(text) => { this.handleChangeInput('password', text); }} />
            </Item>

          </Form>
          <Button style={styles.myButton} rounded success onPress={() => { this.handleSignUp(); }}>
            <Text>Sign Up</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signUp: (data) => { dispatch(actionSignUp(data)); },
});

const connectedSignUp = connect(null, mapDispatchToProps)(SignUp);
export default connectedSignUp;
