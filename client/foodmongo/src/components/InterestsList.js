import React, { Component } from 'react';
import { View, StyleSheet, ListView, Text } from 'react-native';
import { Container, Header, Item, Input, Icon, Button } from 'native-base';
import { connect } from 'react-redux';

import InterestItem from './InterestItem';
import { fetchInterests } from '../actions';

const styles = StyleSheet.create({
  backdrop: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    // marginTop: 0,
  },
});

export class InterestsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuisines: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }).cloneWithRows(this.props.interests),
      searchTerm: '',
    };
  }

  handleSearch() {
    if (this.state.searchTerm) {
      const regex = new RegExp(this.state.searchTerm, 'gi');
      const arr = this.props.interests.filter(interest => interest.cuisine_name.match(regex));
      return new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }).cloneWithRows(arr);
    }
    return this.state.cuisines;
  }

  render() {
    return (
      <View>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search Interest" onChangeText={(searchTerm) => { this.setState({ searchTerm }); }}/>
            <Icon name="md-paper-plane" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <ListView
          contentContainerStyle={styles.backdrop}
          dataSource={this.handleSearch()}
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
