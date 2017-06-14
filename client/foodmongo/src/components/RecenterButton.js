import React from 'react';
import { Button, Icon } from 'native-base';
import { Text } from 'react-native';

const RecenterButton = props => (
  <Button
    rounded
    warning
    onPress={() => { props.handlePress(); }}
    style={{ position: 'absolute', bottom: 10, right: 10 }}
  >
    <Icon name="md-navigate" style ={{ color: 'white' }}/>
    <Text style={{ color: 'white' }}> Re-Center </Text>
  </Button>
);

export default RecenterButton;
