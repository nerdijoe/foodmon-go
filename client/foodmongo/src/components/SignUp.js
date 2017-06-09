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
} from 'native-base';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#F0F0F0' }} >
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry={true} />
            </Item>
            <Button rounded success>
              <Text>Sign Up</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default SignUp;
