import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backdropView: {
    margin: 1,
    height: 120,
    width: 120,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  headline: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
  },
});

const InterestItem = props => (
  <Image style={styles.backdropView} source={{ uri: `http://loremflickr.com/320/240/${props.cuisine_name},food/all` }}>
    <View>
      <Text style={styles.headline}>
        {props.cuisine_name}
      </Text>
    </View>
  </Image>
);

export default InterestItem;
