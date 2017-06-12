import React from 'react';
import MapView from 'react-native-maps';

import markerUser from '../assets/userlocation/marker_user_width100.png';
import markerUserSmall from '../assets/userlocation/marker_user.png';

const UserLocation = props => (
  <MapView.Marker
    image={markerUserSmall}
    coordinate={{
      latitude: Number(props.region.latitude),
      longitude: Number(props.region.longitude),
    }}
  />
);

export default UserLocation;
