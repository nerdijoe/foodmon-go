import MapView from 'react-native-maps';
import React, { Component } from 'react';
import { Content } from 'native-base';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';

const b = '#000000'

class Recommendation extends Component {
  handleInterest() {
    let cuisinesArr = this.props.restaurant.cuisines.split(', ');
    let interestArr = this.props.user.interestArr;
    for (let i = 0; i < interestArr.length; i++) {
      for (let j = 0; j < cuisinesArr.length; j++) {
        if (interestArr[i].cuisine_name === cuisinesArr[j]) {
          return 'blue';
        }
      }
    }
    return 'red';
  }
  render() {
    return (
      <Content>
        <MapView.Marker
          pinColor={this.handleInterest()}
          coordinate={{
            latitude: Number(this.props.restaurant.location.latitude),
            longitude: Number(this.props.restaurant.location.longitude),
          }}
        >
          <MapView.Callout>
            <View>
              <Image
                style={{ height: 150, width: 150 }}
                source={{ uri: this.props.restaurant.featured_image }}
              />
              <Text>{this.props.restaurant.name}</Text>
              <Text numberOfLines={2}>
                {this.props.restaurant.location.address}
              </Text>
              <Text>
                {this.props.restaurant.url}
              </Text>
            </View>
          </MapView.Callout>
        </MapView.Marker>
      </Content>
    )
  }
}


const mapStateToProps = state => ({
  user: state.UserReducer,
});

export default connect(mapStateToProps)(Recommendation);
