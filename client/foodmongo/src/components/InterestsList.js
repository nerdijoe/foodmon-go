import React, { Component } from 'react';
import { View, StyleSheet, ListView } from 'react-native';
import axios from 'axios';

import InterestItem from './InterestItem';

const styles = StyleSheet.create({
  backdrop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

class InterestsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuisines: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    };
  }

  componentWillMount() {
    axios.get('https://developers.zomato.com/api/v2.1/cuisines?city_id=74', {
      headers: {
        user_key: '2b958b1e249a2a26c68081cafe451194',
      },
    }).then((res) => {
      this.setState({
        cuisines: this.state.cuisines.cloneWithRows(res.data.cuisines),
      });
    });
  }

  render() {
    return (
      <View>
        <ListView
          contentContainerStyle={styles.backdrop}
          dataSource={this.state.cuisines}
          renderRow={data => (
            <InterestItem cuisine_name={data.cuisine.cuisine_name} />
          )}
        />
      </View>
    );
  }
}

export default InterestsList;
