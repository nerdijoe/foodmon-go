import React, { Component } from 'react';
import { View, StyleSheet, ListView } from 'react-native';
import { connect } from 'react-redux';

import InterestItem from './InterestItem';
import { fetchInterests } from '../actions';

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
      cuisines: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }).cloneWithRows(this.props.interests),
    };
  }

  render() {
    return (
      <View>
        <ListView
          contentContainerStyle={styles.backdrop}
          dataSource={this.state.cuisines}
          pageSize={20}
          renderRow={cuisine => (
            <InterestItem cuisine={cuisine} />
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  interests: state.interests,
});

export default connect(mapStateToProps)(InterestsList);
