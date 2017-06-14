import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Icon, Toast } from 'native-base';

import { addInterest, removeInterest } from '../actions';


export class InterestItem extends Component {
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
        borderColor: 'white',
      },
      headline: {
        fontSize: 17,
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
        paddingTop: 10,
      },
      overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      overlaySelected: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.2)',
      },
    });
  }

  // onLayout() {
  //   const { width, height } = Dimensions.get('window');
  //   this.setState({
  //     width,
  //     height,
  //   });
  // }
  handleAdd() {
    if (this.props.user.interestArr){
      this.props.addInterest(this.props.cuisine, this.props.user);
    } else {
      Toast.show({
        text: 'Please login to pick your interests.',
        position: 'center',
        type: 'warning',
        duration: 2000,
      });
    }
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
                source={{ uri: `http://loremflickr.com/300/300/${this.props.cuisine.cuisine_name},food/all` }}
                style={this.styles.backdropView}
              >
                <View style={this.styles.overlaySelected}>
                  <Text style={this.styles.headline}>
                    {this.props.cuisine.cuisine_name}
                  </Text>
                  <Icon
                    name="md-checkmark-circle"
                    style={{
                      color: 'green',
                      fontSize: 64,
                      alignSelf: 'center',
                    }}
                  />
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
        onPress={() => { this.handleAdd(); }}
      >
        <Image
          source={{ uri: `http://loremflickr.com/g/300/300/${this.props.cuisine.cuisine_name},food/all` }}
          style={this.styles.backdropView}
        >
          <View style={this.styles.overlay}>
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
