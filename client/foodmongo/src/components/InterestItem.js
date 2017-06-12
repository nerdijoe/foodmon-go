import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { addInterest, removeInterest } from '../actions';

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
  headlineBlack: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'black',
  },
});

class InterestItem extends Component {
  handleInterest() {
    if(this.props.user.interestArr) {
      for (let i = 0; i < this.props.user.interestArr.length; i++) {
        if (this.props.user.interestArr[i]._id === this.props.cuisine._id){
          return (
            <TouchableOpacity onPress={() => { this.props.removeInterest(this.props.cuisine, this.props.user); }}>
              <Image style={styles.backdropView} source={{ uri: `http://loremflickr.com/g/320/240/${this.props.cuisine.cuisine_name},food/all` }}>
                <View>
                  <Text style={styles.headline}>
                    {this.props.cuisine.cuisine_name} selected
                  </Text>
                </View>
              </Image>
            </TouchableOpacity>
          )
        }
      }
    }

    // this.props.user.interestArr.map(interest=)
    return (
      <TouchableOpacity onPress={() => { this.props.addInterest(this.props.cuisine, this.props.user); }}>
        <Image style={styles.backdropView} source={{ uri: `http://loremflickr.com/320/240/${this.props.cuisine.cuisine_name},food/all` }}>
          <View>
            <Text style={styles.headline}>
              {this.props.cuisine.cuisine_name}
            </Text>
          </View>
        </Image>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View>
        {this.handleInterest()}
      </View>
    );
  }
}

// const InterestItem = props => (
//   <Image style={styles.backdropView} source={{ uri: `http://loremflickr.com/320/240/${props.cuisine.cuisine_name},food/all` }}>
//     <View>
//       <Text style={styles.headline}>
//         {props.cuisine.cuisine_name}
//       </Text>
//     </View>
//   </Image>
// );

const mapStateToProps = state => ({
  user: state.UserReducer,
});

const mapDispatchToProps = dispatch => ({
  addInterest: (interest, user) => dispatch(addInterest(interest, user)),
  removeInterest: (interest, user) => dispatch(removeInterest(interest, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InterestItem);
