import MapView from 'react-native-maps';
import React from 'react';
import { Content } from 'native-base';
import { Image, Text } from 'react-native';

const Recommendation = props => (
  <Content>
  <MapView.Marker
    coordinate={{
      latitude: Number(props.restaurant.location.latitude),
      longitude: Number(props.restaurant.location.longitude),
    }}
  >
    <MapView.Callout>
      <Image
        style={{ height: 150, width: 150 }}
        source={{ uri: props.restaurant.featured_image }}
      />
      <Text>{props.restaurant.name}</Text>
      <Text numberOfLines={2}>
        {props.restaurant.location.address}
      </Text>
      <Text>
        {props.restaurant.url}
      </Text>
    </MapView.Callout>
  </MapView.Marker>
  </Content>
);


export default Recommendation;
