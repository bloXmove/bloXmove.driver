import React, {useState} from 'react';
import {
  View,
  useColorScheme,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import dynamicStyles from './styles';
import {useDispatch} from 'react-redux';
import {setCurrent} from '../../screens/HomeScreens/redux/actions';
import {displayErrors} from '../../helpers/displayErrors';
import {journeyRequestAccept} from '../../screens/HomeScreens/utils/api/jonuney';
import {getSignature} from '../../screens/HomeScreens/utils/api/nft';
import {useSelector} from 'react-redux';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';
import {getCurrentData, calcuateDuration} from '../../helpers';
import {Button, Text, COLORS} from '@components';
import {AddressRequest} from '../../screens/HomeScreens/ApprovedScreens/components/Addresses/AddressRequest';
import Profile from '@app/assets/image/icons/profile.svg';
import * as Progress from 'react-native-progress';

const CardItem = props => {
  const {appStyles, appConfig, item, navigation} = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {provider} = useWalletConnectModal();
  const accountId = useSelector(state => state.auth.user.walletAddress);
  const apiToken = useSelector(state => state.auth.token);
  const currentJourney = useSelector(state => state.journey.currentJourney);

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
  const [second, setSecond] = useState(120);

  const accpetClick = async () => {
    setLoading(true);
    const data = await getCurrentData();
    if (data === 'fail') {
      setLoading(false);
      return;
    }
    const signature = await getSignature(accountId, provider, data);
    if (signature.success !== true) {
      setLoading(false);
      Alert.alert('Please confirm transaction', '');
      return;
    }
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
          const errorMesssage = error.response.data.message;
          if (
            !Array.isArray(errorMesssage) &&
            (errorMesssage === 'can not accept this journey request' ||
              errorMesssage === 'Journey request not in valid status.')
          ) {
            dispatch(setCurrent({data: ''}));
            Alert.alert(
              '',
              Array.isArray(errorMesssage) ? errorMesssage[0] : errorMesssage,
            );
            return;
          }
        }
        displayErrors(error);
      });
    return;
  };
  const declineClick = () => {
    // BackgroundTimer.clearInterval(intervalId.current);
    if (currentJourney.status === 'WAIT') {
      console.log('click decline');
      dispatch(setCurrent({data: ''}));
    }
  };

  const openClick = () => {
    console.log(item.status);
    if (
      item.status === 'STARTED' ||
      item.status === 'WAIT_FOR_DRIVER_ARRIVAL' ||
      item.status === 'DRIVER_ARRIVED'
    ) {
      navigation.navigate('Approved', {
        appStyles: appStyles,
        item: item,
        backFlag: false,
      });
    } else {
      navigation.navigate('Completed', {
        appStyles: appStyles,
        jourRequest: item.journeyRequest,
        requestData: item.journeyRequest,
        item: item,
        backFlag: false,
      });
    }
  };
  return (
    <View style={styles.boxContainer}>
      {item.status === 'WAIT' && (
        <View style={styles.newRequestTopContainer}>
          <Text textStyle="body18Semibold" style={styles.inputLabel}>
            New Request
          </Text>
          <View style={styles.passengerContainer}>
            <View style={styles.flexContainer}>
              <Profile />
              <Text textStyle="body18Regular" style={styles.nameLabel}>
                {item.passengerName}
              </Text>
            </View>
            <Progress.Circle
              size={40}
              thickness={3}
              showsText={true}
              progress={!loading ? 1 : 1}
              animated={true}
              indeterminate={true}
              style={styles.progress}
              color={COLORS.primary}
              borderWidth={3}>
              <Text style={styles.timeText}>{second}</Text>
            </Progress.Circle>
          </View>
        </View>
      )}
      {item.status !== 'WAIT' && (
        <View style={styles.boxBottomHeader}>
          <Text style={styles.boxTitle}>{item.status.replace(/_/g, ' ')}</Text>
          <View style={styles.btnAcceptContainer}>
            <TouchableOpacity
              style={styles.btnFullContainer}
              disabled={loading}
              onPress={openClick}>
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.btnText}>Open</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* <View style={styles.boxBody}>
        <Text style={styles.boxText}>
          Departure time : &nbsp;
          {Moment(Number.parseInt(pickUpTime, 10)).format('HH:mm')}
        </Text>
      </View> */}
      <AddressRequest from={depatureName} to={desName} numberOfLines={1} />
      <View style={styles.priceContainer}>
        <View style={styles.centerContainer}>
          <Text textStyle="body14Regular" style={styles.priceText}>
            Time
          </Text>
          <Text textStyle="body14Regular">{calcuateDuration(item.eta)}</Text>
        </View>
        <View style={styles.centerContainer}>
          <Text textStyle="body14Regular" style={styles.priceText}>
            Distance
          </Text>
          <Text textStyle="body14Regular">
            {(item?.distance / 1000).toFixed(2)} km
          </Text>
        </View>
        <View style={styles.centerContainer}>
          <Text textStyle="body14Regular" style={styles.priceText}>
            Price
          </Text>
          <Text textStyle="body14SemiBold" style={styles.primaryText}>
            {' '}
            ₦ {item.price}
          </Text>
        </View>
      </View>
      {item.status === 'WAIT' && (
        <View style={styles.btnContainer}>
          <Button
            disabled={loading}
            title="Decline"
            onPress={declineClick}
            containerStyle={styles.btnDecline}
          />
          <Button
            disabled={loading}
            title="Accept"
            onPress={accpetClick}
            containerStyle={styles.btnAccept}
          />
        </View>
      )}
    </View>
  );
};

export default CardItem;
