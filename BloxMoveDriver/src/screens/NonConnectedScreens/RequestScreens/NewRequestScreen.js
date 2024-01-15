import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import dynamicStyles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import Moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {Dash} from '../../../components';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {journeyRequestAccept} from '../utils/api/jonuney';
import {setCurrent} from '../redux/actions';
import {displayErrors} from '../../../helpers/displayErrors';
import {getCurrentData} from '../../../helpers/getPermission';
import {getSignature} from '../utils/api/nft';

const NewRequestScreen = props => {
  const {navigation, route} = props;
  const appStyles = route.params.appStyles;
  const item = route.params.item;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const apiToken = useSelector(state => state.auth.token);
  const accountId = useSelector(state => state.auth.user.walletAddress);
  const connector = useWalletConnect();

  const pickUpTime =
    item.status === 'WAIT' ? item.pickUpTime : item.journeyRequest.pickUpTime;
  const depatureName =
    item.status === 'WAIT'
      ? item.departure.name
      : item.journeyRequest.from.name;
  const desName =
    item.status === 'WAIT'
      ? item.destination.name
      : item.journeyRequest.to.name;

  let currentTheme = appStyles.navThemeConstants[colorScheme];

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            name="arrow-back-outline"
            size={30}
            color={currentTheme.fontColor}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  console.log(item);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const clickAccept = async () => {
    const data = await getCurrentData();
    if (data === 'fail') {
      return;
    }
    const signature = await getSignature(accountId, connector, data);
    if (signature.success !== true) {
      Alert.alert('Please confirm transaction', '');
      return;
    }
    setLoading(true);
    journeyRequestAccept(item.id, apiToken)
      .then(response => {
        setLoading(false);
        dispatch(setCurrent({data: response.data.data}));
        navigation.navigate('Approved', {
          appStyles: appStyles,
          item: response.data.data,
          backFlag: false,
        });
      })
      .catch(error => {
        setLoading(false);
        if (error.response) {
          if (
            !Array.isArray(error.response.data.message) &&
            error.response.data.message ===
              'can not accept this journey request'
          ) {
            console.log('cancel from new request');
            dispatch(setCurrent({data: ''}));
            Alert.alert(
              Array.isArray(error.response.data.message)
                ? error.response.data.message[0]
                : error.response.data.message,
            );
            return;
          }
        }
        displayErrors(error);
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <Image
          style={styles.headerImg}
          source={appStyles.iconSet.city}
          size={200}
          color="white"
        />
        <View style={styles.headerBox}>
          <View style={[styles.flexContainer]}>
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
              <Text style={styles.depText}>{depatureName}</Text>
              <View style={styles.divider} />
              <Text style={styles.depText}>{desName}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bodyBoxContainer}>
          <View style={styles.boxContainer}>
            <View style={styles.boxHeader}>
              <Text style={styles.title}>Request</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.boxBody}>
              <View style={styles.flexContainer}>
                <Text style={styles.text}>Departure time : </Text>
                <Text style={styles.subText}>
                  {Moment(Number.parseInt(pickUpTime, 10)).format('HH:mm')}
                </Text>
                <Image
                  style={styles.taxiImg}
                  source={
                    item.vehicleType === 'CAR'
                      ? appStyles.iconSet.taxiIcon
                      : appStyles.iconSet.taxiIcon
                  }
                  size={200}
                  color="white"
                />
              </View>
              <View style={styles.flexContainer}>
                <Text style={styles.text}>Estimated arrival time : </Text>
                <Text style={styles.subText}>
                  {Moment(
                    Number.parseInt(pickUpTime, 10) +
                      Number.parseInt(item.eta, 10),
                  ).format('HH:mm')}
                </Text>
              </View>
              <View style={styles.flexContainer}>
                <Text style={styles.text}>Duration : {item.eta}</Text>
                <Text style={styles.subText}>
                  {(Number.parseInt(item.eta) / 60000).toFixed(0)} min{' '}
                </Text>
              </View>
              <View style={styles.flexContainer}>
                <Text style={styles.text}>Passenger's Name : </Text>
                <Text style={styles.subText}>{item.passengerName} </Text>
              </View>
              <View style={styles.flexContainer}>
                <Text style={styles.text}>Passenger's Tel : </Text>
                <Text style={styles.subText}>{item.passengerPhoneNumber} </Text>
              </View>
              <View style={styles.flexContainer}>
                <Text style={styles.text}>Payment type : </Text>
                <Text style={styles.subText}>{item.paymentType} </Text>
              </View>
              <View>
                <Text style={styles.text}>Terms and Conditions : </Text>
                <Text style={styles.subText}>xxxxxxxxxxxxx </Text>
              </View>
              <View style={styles.flexContainer}>
                <Text style={styles.text}>Estimated Charges : </Text>
                <Text style={styles.subText}>20 Naria </Text>
              </View>
              <View style={styles.flexContainer}>
                <Text style={styles.priceText}>NGN {item.price}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.btnBoxContainer}>
                <TouchableOpacity
                  style={styles.btnCancelContainer}
                  onPress={() => {
                    console.log(
                      'cancel from new request click by my rides button',
                    );
                    dispatch(setCurrent({data: ''}));
                    props.navigation.navigate('MyRides', {
                      appStyles: appStyles,
                    });
                  }}>
                  <Text style={styles.btnText}>Decline Request</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => clickAccept()}
                  disabled={loading}
                  style={styles.btnContainer}>
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={styles.btnText}>Accept Request</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
NewRequestScreen.propTypes = {
  appStyles: PropTypes.object,
  appConfig: PropTypes.object,
};

export default NewRequestScreen;
