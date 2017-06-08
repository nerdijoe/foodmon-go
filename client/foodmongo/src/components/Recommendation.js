import MapView from 'react-native-maps';
import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import { Image } from 'react-native'
export default class Recommendation extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return(
      <MapView.Marker coordinate={{latitude: Number(this.props.restaurant.location.latitude), longitude: Number(this.props.restaurant.location.longitude)}}>
        <MapView.Callout>
          <Card>
          <CardItem>
          <Left>
          <Body>
          <Text>{this.props.restaurant.name}</Text>
          </Body>
          </Left>
          </CardItem>
                        <CardItem>
                        <Left>
                            <Body>
                                <Image style={{height: 50, width: 50}} source={{uri: this.props.restaurant.featured_image}} />
                            </Body>
                            </Left>
                        </CardItem>
                        </Card>
        </MapView.Callout>
      </MapView.Marker>
    )
  }
}
