import MapView from 'react-native-maps';
import React, { Component } from 'react';
import { Content } from 'native-base';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';

import RecommendationCallout from './RecommendationCallout';
import fav from '../assets/recommendation/marker_fav.png';
import marker from '../assets/recommendation/marker_normal.png';

class Recommendation extends Component {
  handleInterest() {
    let cuisinesArr = this.props.restaurant.cuisines.split(', ');
    let interestArr = this.props.user.interestArr;
    if (interestArr) {
      for (let i = 0; i < interestArr.length; i++) {
        for (let j = 0; j < cuisinesArr.length; j++) {
          if (interestArr[i].cuisine_name === cuisinesArr[j]) {
            return fav;
          }
        }
      }
      return marker;
    } else {
      return marker;
    }
  }

  render() {
    return (
      <Content>
        <MapView.Marker
          image={this.handleInterest()}
          coordinate={{
            latitude: Number(this.props.restaurant.location.latitude),
            longitude: Number(this.props.restaurant.location.longitude),
          }}
          onPress={()=>{this.props.handleClick()}}
        >
          <RecommendationCallout restaurant={this.props.restaurant} />
        </MapView.Marker>
      </Content>
    )
  }
}


const mapStateToProps = state => ({
  user: state.UserReducer,
});

export default connect(mapStateToProps)(Recommendation);
