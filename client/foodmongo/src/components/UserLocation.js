import React from 'react';
import MapView from 'react-native-maps';

import markerUser from '../assets/userlocation/marker_user.png';

const UserLocation = props => (
  <MapView.Marker
    image={markerUser}
    coordinate={{
      latitude: props.userPosition.latitude,
      longitude: props.userPosition.longitude,
    }}
  />
);

export default UserLocation;
