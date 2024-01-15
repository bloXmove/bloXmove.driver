import React, {useState, useLayoutEffect} from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import dynamicStyles from './styles';

import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import {RadioButton} from 'react-native-radio-buttons-group';
import {journeyCancel, journeyDetail} from '../../utils/api/jonuney';
import {displayErrors} from '../../../../helpers/displayErrors';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentData} from '../../../../helpers/getPermission';
import {nftAPI} from '../../utils';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {setCurrent} from '../../redux/actions';
import {Text, COLORS, Button} from '@components';

const CancelRideScreen = props => {
  const {route, navigation} = props;
  const appConfig = route.params.appConfig;
  const appStyles = route.params.appStyles;
  const item = route.params.item;
  const iterval = route.params.iterval;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const [acc, setAcc] = useState('');
  const [loading, setLoading] = useState(false);
  const connector = useWalletConnect();
  const accountId = useSelector(state => state.auth.user.walletAddress);
  const dispatch = useDispatch();
  let currentTheme = appStyles.navThemeConstants[colorScheme];
  const apiToken = useSelector(state => state.auth.token);
  const reasonList = [
    'NO_REASON',
    'TRAFFIC_ALONG_ROUTE',
    'THE_DRIVER_ARRIVED_AT_THE_WRONG_PICKUP_LOCATION',
    'RIDER ASKED ME TO CANCEL',
    'OTHER_REASON',
  ];
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            props.navigation.navigate('Approved', {
              appStyles: appStyles,
              appConfig: appConfig,
              item: item,
            });
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

  const cancelRide = async () => {
    const curData = await getCurrentData();
    if (curData === 'fail') {
      return;
    }
    setLoading(true);
    const signature = await nftAPI.getSignature(accountId, connector, curData);
    if (signature.success !== true) {
      setLoading(false);
      Alert.alert('Please confirm transaction', '');
      return;
    }
    const data = {
      cancellationReason: acc === '' ? 'NO_REASON' : acc,
    };
    journeyCancel(item.id, data, apiToken)
      .then(response => {
        clearInterval(iterval);
        console.log(response.data);
        console.log('cancel from cancel ride screen request');
        getJourney(apiToken, item.id);
      })
      .catch(error => {
        setLoading(false);
        displayErrors(error);
      });
  };
  const getJourney = async (token, id) => {
    journeyDetail(id, token)
      .then(response => {
        navigation.navigate('Completed', {
          item: response.data.data,
          jourRequest: response.data.data.journeyRequest,
          backFlag: true,
        });
        dispatch(setCurrent({data: ''}));
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        displayErrors(error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() =>
              props.navigation.navigate('Approved', {
                appStyles: appStyles,
                appConfig: appConfig,
                item: item,
              })
            }>
            <Icon name="arrow-back-outline" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text textStyle="body18Semibold">Cancelation Reason</Text>
        </View>
        <View style={styles.cancelBoxContainer}>
          <Text textStyle="body14Regular" style={styles.topText}>
            Please tell us the reason why you are canceling your ride .
          </Text>
          {reasonList.map(item => {
            return (
              <TouchableOpacity
                onPress={() => setAcc(item)}
                key={item}
                style={styles.selectContainer}>
                {/* <CheckBox
                  disabled={false}
                  value={acc === item ? true : false}
                  style={styles.checkBox}
                  tintColors={{
                    true: COLORS.primary,
                    false: appStyles.colorSet[colorScheme].grey0,
                  }}
                /> */}
                <RadioButton
                  selected={acc === item ? true : false}
                  color={COLORS.primary}
                  borderColor={COLORS.form}
                  size={20}
                />
                <Text textStyle="body18Regular" style={styles.text}>
                  {item.replace(/_/g, ' ')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Button
          title="Submit"
          disabled={loading}
          onPress={cancelRide}
          containerStyle={styles.btnCancel}
        />
        {/* <View style={styles.cancelContainer}>
          <TouchableOpacity
            style={[styles.btnCancelContainer, styles.fullWidth]}
            disabled={loading}
            onPress={cancelRide}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.btnText}>Cancel Ride</Text>
            )}
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

CancelRideScreen.propTypes = {
  appStyles: PropTypes.object,
  appConfig: PropTypes.object,
};

export default CancelRideScreen;
