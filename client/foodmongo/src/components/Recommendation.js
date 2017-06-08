import MapView from 'react-native-maps';
import React, { Component } from 'react';
import { Card, CardItem, Text, Left, Body } from 'native-base';
import { Image } from 'react-native';


const Recommendation = props => (
  <MapView.Marker
    coordinate={{
      latitude: Number(props.restaurant.location.latitude),
      longitude: Number(props.restaurant.location.longitude)
    }}
  >
    <MapView.Callout>
      <Card>
        <CardItem>
          <Left>
            <Body>
              <Text>{props.restaurant.name}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Left>
            <Body>
              <Image
                style={{ height: 50, width: 50 }}
                source={{ uri: props.restaurant.featured_image }}
              />
            </Body>
          </Left>
        </CardItem>
      </Card>
    </MapView.Callout>
  </MapView.Marker>
);


export default Recommendation;
