import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { View, Image, Text, Linking, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  // Callout bubble
  bubble: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    padding: 15,
    width: 180,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  // Character name
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  // Character image
  image: {
    width: 150,
    height: 100,
  },
});

class RecommendationCallout extends Component {
  handleImage() {
    if (this.props.restaurant.featured_image) {
      return {
        uri: this.props.restaurant.featured_image,
      };
    }
    return {};
  }

  render() {
    return (
      <MapView.Callout
        onPress={() => { Linking.openURL(this.props.restaurant.url).catch(err => console.error('An error occurred', err)); }}
        style={{ width: 200 }}
      >
        <View style={styles.container}>
          <View style={styles.bubble}>
            <View>
              <Text style={styles.name}>{this.props.restaurant.name}</Text>
              <Text style={{ marginBottom: 5 }}>{this.props.restaurant.cuisines}</Text><Image
                style={styles.image}
                source={this.handleImage()}
              />
              <Text>{this.props.restaurant.location.address}</Text>
            </View>
          </View>
        </View>
      </MapView.Callout>
    );
  }
}

export default RecommendationCallout;
