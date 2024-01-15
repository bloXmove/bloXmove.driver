import React, {useRef, useState, useLayoutEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  useColorScheme,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import dynamicStyles from './styles';

import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import {Dash} from '../../../components';
import Svgs from '../../../../assets/svg/svgs';
import Geolocation from 'react-native-geolocation-service';
import deviceStorage from '../../utils/AuthDeviceStorage';
import MapViewDirections from 'react-native-maps-directions';

const HomeCompanyScreen = props => {
  const {navigation, route} = props;
  const appConfig = route.params.appConfig;
  const appStyles = route.params.appStyles;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const mapRef = useRef();
  const [status, setStatus] = useState(
    route.params.status ? route.params.status : 0,
  );
  const origin = {latitude: 6.5244, longitude: 3.3792};
  const destination = {latitude: 7.1, longitude: 4.8417};
  // eslint-disable-next-line no-unused-vars
  const [showCurrent, setCurrent] = useState(false);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
    });
  }, []);

  const [position, setPosition] = useState({
    latitude: 6.5244,
    longitude: 3.3792,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0421,
  });
  const trackCurrent = () => {
    Geolocation.getCurrentPosition(
      curPos => {
        const crd = curPos.coords;
        setPosition({
          latitude: crd.latitude,
          longitude: crd.longitude,
          latitudeDelta: 0.0421,
          longitudeDelta: 0.0421,
        });
        setCurrent(true);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
    );
  };
  const changeStatus = () => {
    if (status === 0) {
      // Geolocation.getCurrentPosition((pos) => {
      //     const crd = pos.coords;
      //     setPosition({
      //         latitude: crd.latitude,
      //         longitude: crd.longitude,
      //         latitudeDelta: 0.0421,
      //         longitudeDelta: 0.0421,
      //     });
      //     setCurrent(true);
      // }).catch((err) => {
      //     console.log(err);
      // });
    }
    if (status < 1) {
      setStatus(status + 1);
    } else {
      Alert.alert('You are about to end the trip', '', [
        {
          text: 'Cancel',
        },
        {
          text: 'Confirm',
          style: 'cancel',
          onPress: () => setStatus(status + 1),
        },
      ]);
    }
  };
  const goHome = () => {
    deviceStorage.setShouldShowOnboardingFlow('true');
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'LoginStack',
          params: {appStyles: appStyles, appConfig: appConfig},
        },
      ],
    });
  };
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        initialRegion={position}
        region={position}
        style={styles.mapContainer}
        showsUserLocation={false}
        userInterfaceStyle={'light'}>
        <Marker
          coordinate={{
            latitude: 6.5244,
            longitude: 3.3792,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.0421,
          }}>
          {status !== 2 ? (
            <Image
              style={styles.taxiMapIcon}
              source={appStyles.iconSet.busIcon}
              size={200}
              color="white"
            />
          ) : (
            <Svgs.Current size={30} />
          )}
        </Marker>
        <Marker
          coordinate={{
            latitude: 7.1,
            longitude: 4.8417,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.0421,
          }}>
          {status !== 2 ? (
            <Svgs.Current size={30} />
          ) : (
            <Image
              style={styles.taxiMapIcon}
              source={appStyles.iconSet.busIcon}
              size={200}
              color="white"
            />
          )}
        </Marker>
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={process.env.API_KEY}
          mode={'DRIVING'}
          strokeWidth={3}
          strokeColor={appStyles.colorSet[colorScheme].mainThemeForegroundColor}
        />
      </MapView>
      <View style={[styles.boxContainer, styles.bottomContainer]}>
        <View style={styles.headerContainer}>
          {status === 0 && <Text style={styles.title}>Scheduled Trip</Text>}
          {status === 1 && <Text style={styles.title}>In Progress</Text>}
          {status === 2 && <Text style={styles.title}>Completed</Text>}
          <TouchableOpacity onPress={() => trackCurrent()} style={styles.track}>
            <Svgs.Track size={20} style={styles.track} />
          </TouchableOpacity>
        </View>
        <View style={[styles.bodyContainer, styles.flexContainer]}>
          <View style={styles.leftContainer}>
            <Icon
              name="radio-button-on-outline"
              size={25}
              color={appStyles.colorSet[colorScheme].mainColor}
            />
            <Dash appStyles={appStyles} />
            <Icon name="location-outline" size={25} color={'red'} />
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.depText}>Lagos</Text>
            <View style={styles.divider} />
            <Text style={styles.desText}>Ondo</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.bodyBottomContainer}>
          <Text style={styles.text}>Departure Time : </Text>
          <Text style={styles.text}>8 : 30</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.bodyBottomContainer}>
          <Text style={styles.text}>
            {status === 2 ? 'Arrival Time' : 'Estimated Arrival Time'} :{' '}
          </Text>
          <Text style={styles.text}>10 : 30</Text>
        </View>
        <View style={[styles.footerContainer, styles.flexContainer]}>
          <TouchableOpacity
            onPress={() => goHome()}
            style={[
              styles.btnContainer,
              // eslint-disable-next-line react-native/no-inline-styles
              {width: status === 2 ? '100%' : '50%'},
            ]}>
            <Text style={styles.btnText}>Home</Text>
          </TouchableOpacity>
          {status !== 2 && (
            <TouchableOpacity
              onPress={() => changeStatus()}
              style={styles.btnCancelContainer}>
              {status === 0 && <Text style={styles.btnText}>Start Trip</Text>}
              {status === 1 && <Text style={styles.btnText}>End Trip</Text>}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

HomeCompanyScreen.propTypes = {
  appStyles: PropTypes.object,
  appConfig: PropTypes.object,
};

export default HomeCompanyScreen;
