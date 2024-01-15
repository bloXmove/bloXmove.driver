import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  useColorScheme,
  Alert,
  Keyboard,
  Dimensions,
  Animated,
  Linking,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import MapView, {Marker} from 'react-native-maps';
import dynamicStyles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Svgs from '../../../../assets/svg/svgs';
import MapViewDirections from 'react-native-maps-directions';
import {useSelector, useDispatch} from 'react-redux';
import {GoogleAPIKey} from '../../../lib/config';
import {
  displayErrors,
  getCurrentData,
  calcuateDuration,
} from '../../../helpers';
import {journeyAPI, nftAPI} from '../utils';
import Moment from 'moment';
import {getCurrentJourneyData, journeyDetail} from '../utils/api/jonuney';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';
import {setCurrent} from '../redux/actions';
import {COLORS, Text, Button} from '@components';
import {Driver} from './components/Driver/Driver';
import {
  activateKeepAwake,
  deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';

import * as Progress from 'react-native-progress';
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';
import {calculateHeading} from '@app/src/helpers/calculateHeading';
import {getCurrentLocation} from '@app/src/helpers/getPermission';
import {getApps} from 'react-native-map-link';

const {height, width} = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const ApprovedScreen = props => {
  const {navigation, route} = props;
  const appConfig = route.params.appConfig;
  const appStyles = route.params.appStyles;
  const backFlag = route.params.backFlag;
  // const item = route.params.item;
  const item = useSelector(state => state.journey.currentJourney);
  const jourRequest = item.journeyRequest;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const mapRef = useRef();
  const apiToken = useSelector(state => state.auth.token);
  const accountId = useSelector(state => state.auth.user.walletAddress);
  const {provider} = useWalletConnectModal();

  const [status, setStatus] = useState(item.status);

  const origin = jourRequest?.from;
  const destination = jourRequest?.to;
  const [position, setPosition] = useState({
    latitude: (origin?.latitude + destination?.latitude) / 2 - 0.01,
    longitude: (origin?.longitude + destination?.longitude) / 2,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0421,
  });
  const [showCurrent, setCurrentLocation] = useState(true);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [duration, setDuration] = useState(60);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [processWidth, setProgress] = useState(0);
  // Gesture
  const marginBottom = useRef(new Animated.Value(-150)).current;
  const startPos = useSharedValue(0);
  const [rotateZ, setRotatez] = useState(0);
  // Update Driver's location
  let intervalId = useRef(null);
  const [driverLocation, setDriver] = useState({});
  const [isReady, setReady] = useState(false);
  const [directionFlag, setDirectionFlag] = useState(true);

  // Get the current location
  var preLocation = {};
  useEffect(() => {
    var errorFlag = false;
    const unsubscribe = navigation.addListener('focus', () => {
      intervalId.current = setInterval(async () => {
        const location = await getCurrentLocation();
        console.log('location', location);
        if (location.coords) {
          setDriver(location.coords);
          if (
            preLocation !== {} &&
            preLocation.latitude !== location.coords.latitude &&
            preLocation.longitude !== location.coords.longitude
          ) {
            setRotatez(calculateHeading(preLocation, location.coords));
          }
          // Display the current location on android - showsUserLocation on iOS
          if (Platform.OS === 'android') {
            const latDelta = 0.0042;
            const lngDelta = latDelta * ASPECT_RATIO;
            mapRef.current?.animateToRegion(
              {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: latDelta,
                longitudeDelta: lngDelta,
                // latitudeDelta: 0.0422,
                // longitudeDelta: 0.1921,
              },
              0,
            );
          }
          preLocation = location.coords;
        } else {
          if (!errorFlag) {
            errorFlag = true;
            Alert.alert('', "Sorry, we can't get your location");
          }
        }
      }, 5000);
      return () => {
        clearInterval(intervalId.current);
      };
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    setStatus(item.status);
    if (item.status === 'WAIT_FOR_DRIVER_ARRIVAL') {
      setProgress(0);
    } else if (item.status === 'DRIVER_ARRIVED') {
      setProgress(0.3);
    } else if (item.status === 'STARTED') {
      setProgress(0.6);
    } else {
      setProgress(1);
    }
    if (!item.status) {
      return;
    }
    // if (item.status === 'CANCEL_APPLIED') {
    //   setLoading(true);
    // }
    if (
      // item.status !== 'CANCEL_APPLIED' &&
      item.status !== 'STARTED' &&
      item.status !== 'WAIT_FOR_DRIVER_ARRIVAL' &&
      item.status !== 'DRIVER_ARRIVED'
    ) {
      setQrModalVisible(false);
      clearInterval(intervalId.current);
      deactivateKeepAwake();
      navigation.navigate('Completed', {
        item: item,
        jourRequest: jourRequest,
        requestData: jourRequest,
        backFlag: true,
        appStyles: appStyles,
        appConfig: appConfig,
      });
      dispatch(setCurrent({data: ''}));
      setDirectionFlag(false);
      setLoading(false);
    } else {
      activateKeepAwake();
      setDirectionFlag(true);
    }
  }, [item]);
  useEffect(() => {}, [driverLocation]);
  useEffect(() => {
    updateMapView();
    if (!item.status) {
      return;
    }
    if (item.status === 'WAIT_FOR_DRIVER_ARRIVAL' && driverLocation) {
      setRotatez(calculateHeading(driverLocation, origin));
    } else {
      // setRotatez(calculateHeading(origin, destination));
    }
  }, [item.status]);

  const updateMapView = useCallback(() => {
    if (origin && origin.latitude && destination.latitude) {
      let latArr = [];
      origin ? latArr.push(origin) : '';
      destination ? latArr.push(destination) : '';
      mapRef?.current.fitToCoordinates(latArr, {
        edgePadding: {
          top: 40,
          right: 0,
          bottom: height / 1.5,
          left: 0,
        },
        animated: true,
      });
    }
  }, [destination, origin]);

  const detailRequest = id => {
    journeyDetail(id, apiToken)
      .then(response => {
        dispatch(
          setCurrent({
            data: response.data.data,
          }),
        );
      })
      .catch(error => {
        console.log('Error to get the detail of the journey', error.response);
      });
  };

  const openDrawer = () => {
    Keyboard.dismiss();
    props.navigation.openDrawer();
  };
  const changeStatus = () => {
    if (status === 'WAIT_FOR_DRIVER_ARRIVAL') {
      driveArrival();
    } else if (status === 'DRIVER_ARRIVED') {
      // startRide();
    } else if (status === 'STARTED') {
      endRide();
    }
  };
  const driveArrival = async () => {
    setLoading(true);
    const data = await getCurrentData();
    if (data === 'fail') {
      setLoading(false);
      return;
    }
    journeyAPI
      .driverArrival(item.id, data, apiToken)
      .then(response => {
        setLoading(false);
        detailRequest(item.id);
      })
      .catch(error => {
        setLoading(false);
        displayErrors(error);
      });
  };

  const endRide = async () => {
    setLoading(true);
    const data = await getCurrentData();
    if (data === 'fail') {
      setLoading(false);
      return;
    }
    const signature = await nftAPI.getSignature(accountId, provider, data);
    if (signature.success !== true) {
      setLoading(false);
      Alert.alert('Please confirm transaction', '');
      return;
    }
    data.signature = signature.signature;
    journeyAPI
      .journeyEnd(item.id, data, apiToken)
      .then(response => {
        setQrModalVisible(false);
        // updateCurrent();
        // setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        displayErrors(error);
      });
  };

  const tap = Gesture.Pan()
    .runOnJS(true)
    .onStart(event => {
      startPos.value = event.y;
    })
    .onEnd(e => {
      if (startPos.value < e.y) {
        Animated.timing(marginBottom, {
          toValue: -150,
          duration: 500,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(marginBottom, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }).start();
      }
    });
  const progressContainer = (
    <Progress.Bar
      progress={processWidth}
      width={width * 0.9}
      height={3}
      color={COLORS.primary}
      unfilledColor={COLORS.form}
      borderWidth={0.1}
      borderColor={COLORS.form}
    />
  );

  // Open Map
  const [availableApps, setAvailableApps] = useState([]);
  const [openVisible, setOpenVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await getApps({
        latitude: 38.8976763,
        longitude: -77.0387185,
        // sourceLatitude: -8.0870631, // optionally specify starting location for directions
        // sourceLongitude: -34.8941619, // not optional if sourceLatitude is specified
        directionsMode: 'car',
        // title: 'The White House', // optional
        googleForceLatLon: false, // optionally force GoogleMaps to use the latlon for the query instead of the title
        alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
        appsWhiteList: ['google-maps', 'apple-maps', 'waze'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
      });
      console.log(result);
      setAvailableApps(result);
    })();
  }, []);
  const openMap = name => {
    const scheme = Platform.select({
      ios: 'maps://0,0?daddr=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${jourRequest?.to.latitude},${jourRequest?.to.longitude}`;
    const label = jourRequest?.to?.name;
    const company = Platform.OS === 'ios' ? 'apple' : 'google';
    var url = Platform.select({
      ios:
        name === 'Waze'
          ? `https://www.waze.com/ul?ll=${latLng}&navigate=yes&zoom=17`
          : name === 'Apple Maps'
          ? `${scheme}${label}@${latLng}`
          : `http://maps.google.com/maps?daddr=${latLng}`,
      android:
        name === 'Waze'
          ? `https://www.waze.com/ul?ll=${latLng}&navigate=yes&zoom=17`
          : `http://maps.${company}.com/maps?daddr=${latLng}`,
      // android: `${scheme}${latLng}(${label})`,
      // android: 'google.navigation:q=' + latLng,
    });
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          setOpenVisible(false);
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };
  // End of open map
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openDrawer} style={styles.topToggle}>
        <Icon name="menu" size={24} color={COLORS.primary} />
      </TouchableOpacity>
      <MapView
        ref={mapRef}
        initialRegion={position}
        // region={position}
        style={styles.mapContainer}
        showsUserLocation={showCurrent}
        onLayout={updateMapView}
        followsUserLocation={true}
        onMapReady={() => setReady(true)}
        userInterfaceStyle={'light'}>
        {origin && origin.latitude && isReady && directionFlag && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GoogleAPIKey}
            mode={'DRIVING'}
            strokeWidth={3}
            strokeColor={COLORS.primary}
            onReady={result => setDuration(result.duration)}
          />
        )}
        {driverLocation && driverLocation.latitude && (
          <Marker
            anchor={{x: 0.5, y: 0.5}}
            // tracksViewChanges={Platform.OS === 'ios' ? true : false}
            coordinate={{
              latitude: driverLocation.latitude,
              longitude: driverLocation.longitude,
              // latitudeDelta: 0.0421,
              // longitudeDelta: 0.0421,
            }}>
            {item.status === 'DRIVER_END' ||
            item.status === 'PASSENGER_CANCELED' ||
            item.status === 'DRIVER_CANCELED' ? (
              <Svgs.Current size={30} />
            ) : (
              <FastImage
                style={[
                  styles.taxiMapIcon,
                  {
                    transform: [{rotateZ: rotateZ + 'deg'}],
                  },
                ]}
                source={appStyles.iconSet.taxiIcon}
                resizeMode={FastImage.resizeMode.contain}
              />
            )}
          </Marker>
        )}
        {destination && (
          <Marker
            anchor={{x: 0.5, y: 0.5}}
            // tracksViewChanges={Platform.OS === 'ios' ? true : false}
            coordinate={{
              latitude: destination.latitude,
              longitude: destination.longitude,
              // latitudeDelta: 0.0421,
              // longitudeDelta: 0.0421,
            }}>
            {item.status !== 'DRIVER_END' &&
            item.status !== 'PASSENGER_CANCELED' &&
            item.status !== 'DRIVER_CANCELED' ? (
              <Svgs.Current size={30} />
            ) : (
              <FastImage
                style={styles.taxiMapIcon}
                source={appStyles.iconSet.taxiIcon}
                resizeMode={FastImage.resizeMode.contain}
              />
            )}
          </Marker>
        )}
      </MapView>
      <Animated.View
        style={[
          styles.approvedSmContainer,
          {
            marginBottom: marginBottom,
          },
        ]}>
        <GestureHandlerRootView>
          <GestureDetector gesture={tap}>
            <View>
              <View style={styles.handle} />
              <View style={styles.approveContainer}>
                {status === 'WAIT_FOR_DRIVER_ARRIVAL' && item.eta && (
                  <View>
                    <View style={styles.startContainer}>
                      <View>
                        <Text
                          textStyle="body18Semibold"
                          style={styles.mainColor}>
                          Driving to pickup
                        </Text>
                        <View style={styles.flexContainer}>
                          <Text
                            textStyle="body14Regular"
                            style={styles.secondColor}>
                            {calcuateDuration(item.eta)} away. will arrive{' '}
                          </Text>
                          <Text textStyle="body14Regular">
                            {Moment(
                              Number.parseInt(jourRequest.pickUpTime, 10) +
                                item.eta.toFixed(0) * 60000,
                            ).format('hh:mm a')}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={styles.direction}
                        onPress={() => setOpenVisible(true)}>
                        <FastImage
                          style={styles.directionImage}
                          source={appStyles.iconSet.directionsIcon}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      </TouchableOpacity>
                    </View>
                    {progressContainer}
                    {/* <View style={styles.divider} /> */}
                    <Button
                      title="Arrived"
                      containerStyle={styles.btn}
                      disabled={loading}
                      onPress={changeStatus}
                    />
                  </View>
                )}
                {status === 'DRIVER_ARRIVED' && (
                  <View>
                    <Text textStyle="body18Semibold" style={styles.mainColor}>
                      You have arrived(Waiting)
                    </Text>
                    <View style={styles.flexContainer}>
                      <Text
                        textStyle="body14Regular"
                        style={styles.secondColor}>
                        Your password is:
                      </Text>
                      <Text textStyle="body14Regular"> {item.code}</Text>
                    </View>
                    {progressContainer}
                  </View>
                )}
                {status === 'STARTED' && item.eta && (
                  <View>
                    <View style={styles.startContainer}>
                      <View>
                        <Text
                          textStyle="body18Semibold"
                          style={styles.mainColor}>
                          Ride started.
                        </Text>
                        <View style={styles.flexContainer}>
                          <Text
                            textStyle="body14Regular"
                            style={styles.secondColor}>
                            {calcuateDuration(item.eta)} mins away
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={styles.direction}
                        onPress={() => setOpenVisible(true)}>
                        <FastImage
                          style={styles.directionImage}
                          source={appStyles.iconSet.directionsIcon}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      </TouchableOpacity>
                    </View>
                    {progressContainer}
                    <Button
                      title="End Ride"
                      disabled={loading}
                      containerStyle={
                        loading ? styles.btnCancelLoading : styles.btnCancel
                      }
                      onPress={() => setQrModalVisible(true)}
                    />
                  </View>
                )}
                {status !== 'WAIT_FOR_DRIVER_ARRIVAL' &&
                  status !== 'DRIVER_ARRIVED' &&
                  status !== 'STARTED' && (
                    <Text textStyle="body18Semibold" style={styles.mainColor}>
                      {status ? status.replace(/_/g, ' ') : ''}
                    </Text>
                  )}
                <View style={styles.passengerBox}>
                  <Text textStyle="body14SemiBold">Passenger Details</Text>
                  <Driver
                    item={item}
                    containerStyles={styles.passengerContainer}
                  />
                </View>
                <Text textStyle="body14SemiBold">Destination</Text>
                <View style={styles.desContainer}>
                  <Icon
                    name="radio-button-on-outline"
                    size={25}
                    color={appStyles.colorSet[colorScheme].mainColor}
                  />
                  <Text textStyle="body18Regular" style={styles.addressBottom}>
                    {jourRequest?.to
                      ? jourRequest?.to?.name
                      : jourRequest?.to?.name}
                  </Text>
                </View>
                {status === 'DRIVER_ARRIVED' && (
                  <Button
                    title="Cancel Ride"
                    type="outline"
                    textStyle={styles.cancelText}
                    onPress={() => {
                      navigation.navigate('CancelRide', {
                        appStyles: appStyles,
                        item: item,
                        iterval: intervalId.current,
                      });
                    }}
                  />
                )}
              </View>
            </View>
          </GestureDetector>
        </GestureHandlerRootView>
      </Animated.View>
      {/* Cofirm QR Modal */}
      <Modal
        swipeDirection={['down']}
        onSwipeComplete={() => setQrModalVisible(false)}
        isVisible={qrModalVisible}>
        <View style={styles.QRModalContent}>
          <Text textStyle="body18Semibold">End Ride</Text>
          <Text textStyle="body14Regular" style={styles.endText}>
            Please ensure you are at the destination location or are asked to
            end trip by passenger.
          </Text>
          <Button
            title="End"
            containerStyle={loading ? styles.btnEndLoading : styles.btnEnd}
            onPress={endRide}
            disabled={loading}
          />
          <Button
            title="Continue"
            containerStyle={styles.btnContinue}
            textStyle={styles.blackColor}
            onPress={() => {
              // setLoading(false);
              setQrModalVisible(false);
            }}
          />
        </View>
      </Modal>
      <Modal
        swipeDirection={['down']}
        onSwipeComplete={() => setOpenVisible(false)}
        isVisible={openVisible}
        onBackdropPress={() => setOpenVisible(false)}
        style={styles.modal}>
        <View>
          <Text textStyle="body14Semibold" style={styles.openWith}>
            Open With
          </Text>
          <View style={styles.openModalContent}>
            {availableApps.map(({icon, name, id, open}) => {
              return (
                <TouchableOpacity
                  key={id}
                  onPress={() => openMap(name)}
                  style={[
                    styles.mapIconContainer,
                    {width: 100 / availableApps.length + '%'},
                  ]}>
                  <FastImage source={icon} style={styles.mapIcon} />
                  <Text textStyle="body14Semibold" style={styles.iconText}>
                    {name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>
    </View>
  );
};

ApprovedScreen.propTypes = {
  appStyles: PropTypes.object,
  appConfig: PropTypes.object,
};

export default ApprovedScreen;
