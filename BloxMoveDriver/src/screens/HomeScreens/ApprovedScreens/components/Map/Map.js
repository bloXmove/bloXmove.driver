import MapView, {Marker} from 'react-native-maps';
import {Pin} from '../Pin/Pin';
import React, {useState} from 'react';
import {styles} from './styles';
import MapViewDirections from 'react-native-maps-directions';
import {GoogleAPIKey} from '@app/src/lib/config';
import {COLORS} from '@components';

export const Map = ({from, to}) => {
  const [isReady, setReady] = useState(false);
  const position = {
    latitude: (from.latitude + to.latitude) / 2,
    longitude: (from.longitude + to.longitude) / 2,
    latitudeDelta: 0.0422,
    longitudeDelta: 0.1921,
  };

  return (
    <MapView
      initialRegion={position}
      style={styles.container}
      onMapReady={() => setReady(true)}
      userInterfaceStyle={'light'}>
      {!!from.latitude && isReady && (
        <MapViewDirections
          origin={from}
          destination={to}
          apikey={GoogleAPIKey}
          mode={'DRIVING'}
          strokeWidth={3}
          strokeColor={COLORS.primary}
        />
      )}
      {!!from.latitude && (
        <Marker
          coordinate={{
            latitude: from.latitude,
            longitude: from.longitude,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.1921,
          }}>
          <Pin color="blue" />
        </Marker>
      )}
      {!!to.latitude && (
        <Marker
          coordinate={{
            latitude: to.latitude,
            longitude: to.longitude,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.1921,
          }}>
          <Pin color="green" />
        </Marker>
      )}
    </MapView>
  );
};
