import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  useColorScheme,
  TouchableOpacity,
  AppState,
  Keyboard,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import dynamicStyles from './styles';
import Geolocation from 'react-native-geolocation-service';
import BackgroundGeolocation from 'react-native-background-geolocation';
import BackgroundFetch from 'react-native-background-fetch';
import {CardItem, ListCardItem, StatusItem} from '@components';
import Svgs from '../../../../assets/svg/svgs';
import {GoogleAPIKey} from '../../../lib/config';
import {checkPermission, openSetting} from '../../../helpers/getPermission';
import {userAPI} from '../utils';
import {useSelector, connect} from 'react-redux';
import {displayErrors} from '../../../helpers/displayErrors';
import {getAvailable} from '../utils/api/users';
import Geocoder from 'react-native-geocoding';
import {COLORS, Text} from '@components';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import DeviceInfo from 'react-native-device-info';

const HomeScreen = props => {
  const {navigation, route} = props;
  const appConfig = route.params.appConfig;
  const appStyles = route.params.appStyles;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const apiToken = useSelector(state => state.auth.token);
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  // Geo Location
  const [enabled, setEnabled] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [location, setLocation] = useState('');
  const [motionChangeEvent, setMotionChangeEvent] = useState('');
  const [origin, setOrigin] = useState([]);
  const [destination, setDestination] = useState([]);
  const [duration, setDuration] = useState(0);
  const [driverStatus, setDriverStatus] = useState('NOT_AVAILABLE');

  const mapRef = useRef('');
  const swiperRef = useRef('');
  const [position, setPosition] = useState({
    latitude: 6.564876,
    longitude: 3.367143,
    latitudeDelta: 0.0421,
    longitudeDelta: 0.0421,
  });

  const newOrder = useSelector(state => state.journey.currentJourney);
  const listOrders = useSelector(state => state.journey.listOrders);
  const [cardIndex, setIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getStatus();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getStatus();
  }, [newOrder]);

  useEffect(() => {
    // checkFinePermission();
    Geocoder.init(GoogleAPIKey);
  }, []);
  useEffect(() => {
    let isMounted = true;
    isMounted === true ? manangeRequest() : '';
    return () => {
      isMounted = false;
    };
  }, [newOrder, listOrders]);

  const manangeRequest = () => {
    if (listOrders.length > 0 && cardIndex + 1 === listOrders.length) {
      swiperRef.current?.initDeck();
    }
  };

  const getStatus = async () => {
    const permissionStatus = await checkPermission();
    getAvailable(apiToken).then(response => {
      const status = response.data.data.status;
      if (status === 'AVAILABLE') {
        if (permissionStatus !== 'granted') {
          setDriverStatus('NOT_AVAILABLE');
          // openSetting(
          //   'Please allow location permission to start accepting rides',
          // );
          return;
        }
      }
      setDriverStatus(status);
      status === 'AVAILABLE' && permissionStatus === 'granted'
        ? setIsEnabled(true)
        : setIsEnabled(false);
    });
  };

  const toggleSwitch = async () => {
    if (!isEnabled) {
      const permissionStatus = await checkPermission();
      console.log(permissionStatus);
      if (permissionStatus !== 'granted') {
        openSetting(
          'bloXmove Driver collects location data to enable recording your trips to work and calculate distance-travelled, even when the app is closed or not in use.',
        );
        return;
      } else {
        updateUserStatus();
      }
    } else {
      updateUserStatus();
    }
    // setIsEnabled(previousState => !previousState);
    // Switch Background Geo Location
    switchBackground();
  };

  const updateUserStatus = async () => {
    setLoading(true);
    const data = {
      status: isEnabled ? 'NOT_AVAILABLE' : 'AVAILABLE',
    };
    userAPI
      .updateStatus(data, apiToken)
      .then(async response => {
        isEnabled ? setIsEnabled(false) : setIsEnabled(true);
        setDriverStatus(isEnabled ? 'NOT_AVAILABLE' : 'AVAILABLE');
        if (!isEnabled) {
          updateLocation();
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        displayErrors(error);
      });
  };
  const switchBackground = async () => {
    let state = await BackgroundGeolocation.getState();
    setEnabled(!isEnabled);
    if (!isEnabled) {
      if (state.trackingMode === 1 && !state.enabled) {
        await BackgroundGeolocation.start();
        BackgroundGeolocation.changePace(true);
        setIsMoving(!isMoving);
      }
      console.log('start');
    } else {
      BackgroundGeolocation.stop();
      setIsMoving(false);
    }
  };

  const updateLocation = () => {
    Geolocation.getCurrentPosition(
      curPos => {
        const crd = curPos.coords;
        setPosition({
          latitude: crd.latitude,
          longitude: crd.longitude,
          latitudeDelta: 0.0421,
          longitudeDelta: 0.0421,
        });
        setLocation(curPos);
      },
      error => {
        console.log(error.code, error.message);
      },
    );
  };

  useEffect(() => {
    if (!location) {
      return;
    }
    onLocation();
  }, [location]);
  useEffect(() => {
    updateLocation();
  }, [isEnabled]);
  useEffect(() => {
    if (!motionChangeEvent) {
      return;
    }
    onMotionChange();
  }, [motionChangeEvent]);
  useEffect(() => {
    const locationSubscriber = BackgroundGeolocation.onLocation(
      setLocation,
      error => {
        console.warn('[onLocation] ERROR: ', error);
      },
    );
    const motionChangeSubscriber =
      BackgroundGeolocation.onMotionChange(setMotionChangeEvent);
    initBackgroundFetch();
    initBackgroundGeolocation();

    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      locationSubscriber.remove();
      motionChangeSubscriber.remove();
    };
  }, []);
  const openDrawer = () => {
    Keyboard.dismiss();
    props.navigation.openDrawer();
  };

  const onMotionChange = async () => {
    console.log(
      '[onMotionChange] - ',
      motionChangeEvent.isMoving,
      motionChangeEvent.location,
    );
    setIsMoving(motionChangeEvent.isMoving);
    setLocation(motionChangeEvent.locatTTooion);
  };
  const onLocation = async () => {
    if (location.coords.latitude) {
      const data = {
        // latitude: location.coords.latitude,
        // longitude: location.coords.longitude,
        // latitude: 6.484505299999999,
        // longitude: 3.356833,
        // Android - Agege stadium
        latitude: 6.623744,
        longitude: 3.3302,
        // University Of Jos
        // latitude: 9.9486647,
        // longitude: 8.891098099999999,
        // Jabi Lake Mail
        // latitude: 9.076439100000002,
        // longitude: 7.425385499999998,
      };
      userAPI.saveLocations(apiToken, data);
      console.log('[Saved location] - ', location);
    }
  };
  /// Configure BackgroundGeolocation.ready
  const initBackgroundGeolocation = async () => {
    let systemVersion = DeviceInfo.getSystemVersion();
    // Ready the SDK and fetch the current state.
    const state = await BackgroundGeolocation.ready({
      // Debug
      reset: false,
      debug: false,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      // Geolocation
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      stopTimeout: 5,
      // Permissions
      locationAuthorizationRequest:
        Platform.OS === 'android' && systemVersion < 10
          ? 'WhenInUse'
          : 'Always',
      backgroundPermissionRationale: {
        title:
          "Allow bloXmove Driver to access this device's location even when the app is closed or not in use.",
        message:
          'This app collects location data to enable recording your trips to work and calculate distance-travelled.',
        positiveAction: 'Change to "{backgroundPermissionOptionLabel}"',
        negativeAction: 'Cancel',
      },
      // HTTP & Persistence
      autoSync: true,
      maxDaysToPersist: 14,
      // Application
      stopOnTerminate: false,
      startOnBoot: true,
      enableHeadless: true,
    });

    setEnabled(state.enabled);
    setIsMoving(state.isMoving || false); // <-- TODO re-define @prop isMoving? as REQUIRED in State
  };
  const initBackgroundFetch = async () => {
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,
        enableHeadless: true,
        stopOnTerminate: false,
      },
      async taskId => {
        console.log('[BackgroundFetch]', taskId);
        BackgroundFetch.finish(taskId);
      },
      taskId => {
        console.log('[BackgroundFetch] TIMEOUT:', taskId);
        BackgroundFetch.finish(taskId);
      },
    );
  };
  const _handleAppStateChange = async nextAppState => {
    console.log('[_handleAppStateChange]', nextAppState);
    if (nextAppState === 'background') {
      // App entered background.
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openDrawer} style={styles.topToggle}>
        <Icon name="menu" size={24} color={COLORS.primary} />
      </TouchableOpacity>
      {listOrders.length === 0 &&
        (!newOrder.id ||
          newOrder.status === 'DRIVER_CANCELED' ||
          newOrder.status === 'PASSENGER_CANCELED') && (
          // {!newOrder.id && (
          <View style={styles.statusContainer}>
            <StatusItem
              isEnabled={isEnabled}
              appStyles={appStyles}
              appConfig={appConfig}
              navigation={navigation}
              driverStatus={driverStatus}
              toggleSwitch={toggleSwitch}
            />
          </View>
        )}
      {newOrder.id &&
        newOrder.status !== 'DRIVER_CANCELED' &&
        newOrder.status !== 'PASSENGER_CANCELED' &&
        newOrder.status !== 'JOURNEY_DRIVER_END_FAILED' && (
          <View style={styles.requestContainer}>
            <CardItem
              item={newOrder}
              appStyles={appStyles}
              appConfig={appConfig}
              navigation={navigation}
            />
          </View>
        )}
      {listOrders.length > 0 && (
        <CardStack
          style={styles.requestContainer}
          secondCardZoom={0}
          ref={swiperRef}
          // loop={listOrders.length === 1 ? false : true}
          loop={true}
          verticalSwipe={false}
          horizontalSwipe={listOrders.length === 1 ? false : true}
          disableTopSwipe={true}
          disableBottomSwipe={true}
          disableLeftSwipe={listOrders.length === 1 ? true : false}
          disableRightSwipe={listOrders.length === 1 ? true : false}
          onSwiped={(e, data) => {
            console.log(e);
            console.log(data);
            setIndex(e);
          }}
          renderNoMoreCards={() => <View style={styles.noRequest} />}>
          {listOrders.map((item, index) => (
            <Card key={index}>
              <ListCardItem
                item={item}
                appStyles={appStyles}
                appConfig={appConfig}
                navigation={navigation}
              />
            </Card>
          ))}
        </CardStack>
      )}
      <MapView
        ref={mapRef}
        initialRegion={position}
        region={position}
        style={styles.activeMapView}
        showsUserLocation={true}
        userInterfaceStyle={'light'}>
        {origin.latitude && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GoogleAPIKey}
            mode={'DRIVING'}
            strokeWidth={3}
            strokeColor={
              appStyles.colorSet[colorScheme].mainThemeForegroundColor
            }
            onReady={result => setDuration(result.duration)}
          />
        )}
        {origin.latitude && (
          <Marker coordinate={origin}>
            <Svgs.Current size={30} />
          </Marker>
        )}
        {origin.latitude && (
          <Marker coordinate={origin}>
            <View style={styles.durationContainer}>
              <Text style={styles.durationText}>{duration} min</Text>
            </View>
          </Marker>
        )}
        {origin.latitude && (
          <Marker coordinate={destination}>
            <Svgs.Pin size={30} />
          </Marker>
        )}
      </MapView>
    </View>
  );
};
const mapStateToProps = ({auth, journey}) => {
  return {
    user: auth.user,
    currentJourney: journey.currentJourney,
  };
};

export default connect(mapStateToProps, {})(HomeScreen);
