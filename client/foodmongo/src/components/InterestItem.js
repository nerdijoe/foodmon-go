import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { addInterest, removeInterest } from '../actions';


class InterestItem extends Component {
  constructor(props) {
    super(props);
    const { width, height } = Dimensions.get('window');
    this.state = {
      width,
      height,
    };

    this.styles = StyleSheet.create({
      backdropView: {
        height: this.state.width / 3,
        width: this.state.width / 3,
        backgroundColor: 'rgba(0,0,0,0)',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'white',
      },
      headline: {
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'white',
        paddingTop: 10,
      },
      headlineBlack: {
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'black',
      },
    });
  }


  handleInterest() {
    if(this.props.user.interestArr) {
      for (let i = 0; i < this.props.user.interestArr.length; i++) {
        if (this.props.user.interestArr[i]._id === this.props.cuisine._id){
          return (
            <TouchableOpacity
              onPress={() => { this.props.removeInterest(this.props.cuisine, this.props.user); }}
            >
              <Image
                source={{ uri: `http://loremflickr.com/g/300/300/${this.props.cuisine.cuisine_name},food/all` }}
                style={this.styles.backdropView}
              >
                <View>
                  <Text style={this.styles.headline}>
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
      <TouchableOpacity
        onPress={() => { this.props.addInterest(this.props.cuisine, this.props.user); }}
      >
        <Image
          source={{ uri: `http://loremflickr.com/300/300/${this.props.cuisine.cuisine_name},food/all` }}
          style={this.styles.backdropView}
        >
          <View>
            <Text style={this.styles.headline}>
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
