import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  useColorScheme,
  Alert,
  Keyboard,
  Dimensions,
  Animated,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker} from 'react-native-maps';
import dynamicStyles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {Dash} from '../../../components';
import Svgs from '../../../../assets/svg/svgs';
import MapViewDirections from 'react-native-maps-directions';
import {useSelector, useDispatch} from 'react-redux';
import {GoogleAPIKey} from '../../../lib/config';
import {displayErrors} from '../../../helpers/displayErrors';
import {journeyAPI, nftAPI} from '../utils';
import {getCurrentData} from '../../../helpers/getPermission';
import Moment from 'moment';
import {journeyDetail} from '../utils/api/jonuney';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {setCurrent} from '../redux/actions';
import {COLORS, Text, Button} from '@components';
import {Driver} from './components/Driver/Driver';

import * as Progress from 'react-native-progress';
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

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
  const connector = useWalletConnect();

  const [status, setStatus] = useState(item.status);
  const origin = jourRequest?.from;
  const destination = jourRequest?.to;
  const [position, setPosition] = useState({
    latitude: (origin?.latitude + destination?.latitude) / 2 - 0.01,
    longitude: (origin?.longitude + destination?.longitude) / 2,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0421,
  });
  const [showCurrent, setCurrentLocation] = useState(false);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [qrConfirm, setQRConfirm] = useState(false);
  const [duration, setDuration] = useState(60);
  const [loading, setLoading] = useState(false);
  let intervalId = useRef(null);
  const dispatch = useDispatch();
  const [processWidth, setProgress] = useState(0);
  // Gesture
  const marginBottom = useRef(new Animated.Value(-150)).current;
  const startPos = useSharedValue(0);
  const [rotateZ, setRotatez] = useState(0);
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
    if (
      item.status !== 'STARTED' &&
      item.status !== 'WAIT_FOR_DRIVER_ARRIVAL' &&
      item.status !== 'DRIVER_ARRIVED'
    ) {
      navigation.navigate('Completed', {
        item: item,
        jourRequest: jourRequest,
        requestData: jourRequest,
        backFlag: true,
        appStyles: appStyles,
        appConfig: appConfig,
      });
      dispatch(setCurrent({data: ''}));
    }
  }, [appConfig, appStyles, dispatch, item, jourRequest, navigation, status]);

  useEffect(() => {
    updateMapView();
    calculateHeading();
  }, []);

  const updateMapView = () => {
    if (origin.latitude && destination.latitude) {
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
  };

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
    const data = await getCurrentData();
    if (data === 'fail') {
      return;
    }
    setLoading(true);
    const signature = await nftAPI.getSignature(accountId, connector, data);
    if (signature.success !== true) {
      setLoading(false);
      Alert.alert('Please confirm transaction', '');
      return;
    }
    data.signature = signature.signature;
    journeyAPI
      .journeyEnd(item.id, data, apiToken)
      .then(response => {
        updateCurrent();
        // setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        displayErrors(error);
      });
  };

  const updateCurrent = () => {
    journeyDetail(item.id, apiToken)
      .then(response => {
        console.log('completed', item.id);
        console.log(response.data.data);
        var result = response.data.data;
        result.status = 'DRIVER_END';
        response.data.data
          ? navigation.navigate('Completed', {
              item: result,
              jourRequest: result.journeyRequest,
              requestData: result.journeyRequest,
              backFlag: true,
              appStyles: appStyles,
              appConfig: appConfig,
            })
          : navigation.navigate('MyRides');
        dispatch(setCurrent({data: ''}));
        setQrModalVisible(false);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        displayErrors(error);
      });
  };
  const confirmCode = async () => {
    setQRConfirm(true);
    setQrModalVisible(false);
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
  // Calculate rotation of 2 points
  const calculateHeading = () => {
    if (origin && destination) {
      const {latitude: lat1, longitude: lng1} = origin;
      const {latitude: lat2, longitude: lng2} = destination;
      const y = Math.sin(lng2 - lng1) * Math.cos(lat2);
      const x =
        Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1);
      const θ = Math.atan2(y, x);
      const brng = (((θ * 180) / Math.PI + 360) % 360) + 110;
      console.log(brng);
      setRotatez(brng);
      return brng;
    }
    return 0;
  };
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
  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={tap}>
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
            userInterfaceStyle={'light'}>
            {origin && origin.latitude && (
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
            {origin && origin.latitude && (
              <Marker
                coordinate={{
                  latitude: origin.latitude,
                  longitude: origin.longitude,
                  latitudeDelta: 0.0421,
                  longitudeDelta: 0.0421,
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
                coordinate={{
                  latitude: destination.latitude,
                  longitude: destination.longitude,
                  latitudeDelta: 0.0421,
                  longitudeDelta: 0.0421,
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
            <View style={styles.handle} />
            <View style={styles.approveContainer}>
              {status === 'WAIT_FOR_DRIVER_ARRIVAL' && item.eta && (
                <View>
                  <Text textStyle="body18Semibold" style={styles.mainColor}>
                    Enroute to pickup location
                  </Text>
                  <View style={styles.flexContainer}>
                    <Text textStyle="body14Regular" style={styles.secondColor}>
                      {item.eta.toFixed(0)} mins away. will arrive{' '}
                    </Text>
                    <Text textStyle="body14Regular">
                      {Moment(
                        Number.parseInt(jourRequest.pickUpTime, 10) +
                          item.eta.toFixed(0) * 60000,
                      ).format('hh:mm a')}
                    </Text>
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
                    <Text textStyle="body14Regular" style={styles.secondColor}>
                      Your password is:
                    </Text>
                    <Text textStyle="body14Regular"> {item.code}</Text>
                  </View>
                  {progressContainer}
                </View>
              )}
              {status === 'STARTED' && item.eta && (
                <View>
                  <Text textStyle="body18Semibold" style={styles.mainColor}>
                    Ride started.
                  </Text>
                  <View style={styles.flexContainer}>
                    <Text textStyle="body14Regular" style={styles.secondColor}>
                      {item.eta.toFixed(0)} mins away
                    </Text>
                  </View>
                  {progressContainer}
                  <Button
                    title="End Ride"
                    containerStyle={styles.btnCancel}
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
          </Animated.View>
          {/* Cofirm QR Modal */}
          <Modal
            swipeDirection={['down']}
            onSwipeComplete={() => setQrModalVisible(false)}
            isVisible={qrModalVisible}>
            <View style={styles.QRModalContent}>
              <Text textStyle="body18Semibold">End Ride</Text>
              <Text textStyle="body14Regular" style={styles.endText}>
                Please ensure you are at the destination location or are asked
                to end trip by passenger.
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
                  setLoading(false);
                  setQrModalVisible(false);
                }}
              />
            </View>
          </Modal>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

ApprovedScreen.propTypes = {
  appStyles: PropTypes.object,
  appConfig: PropTypes.object,
};

export default ApprovedScreen;
