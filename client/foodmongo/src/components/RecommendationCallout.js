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
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    width: 150,
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  index: {
    alignSelf: 'center',
    color: '#FFCD38',
    fontWeight: 'bold',
  },
  indexBackground: {
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4A4A4A',
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
              <View style={styles.indexBackground}>
                <Text style={styles.index}>{this.props.index.toString()}</Text>
              </View>
              <Text style={styles.name}>{this.props.restaurant.name}</Text>
              <Text style={{ marginBottom: 5 }}>{this.props.restaurant.cuisines}</Text>
              <Image
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
