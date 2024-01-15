import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  useColorScheme,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import dynamicStyles from './styles';
import {useDispatch} from 'react-redux';
import {
  setCurrent,
  setListJourney,
} from '../../screens/HomeScreens/redux/actions';
import {
  displayErrors,
  calcuateDuration,
  currencyFormat,
  stopSound,
} from '../../helpers';
import {
  journeyRequestAccept,
  journeyRequestDecline,
} from '../../screens/HomeScreens/utils/api/jonuney';
import {getSignature} from '../../screens/HomeScreens/utils/api/nft';
import {useSelector} from 'react-redux';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';
import {getCurrentData} from '../../helpers/getPermission';
import {Button, Text, COLORS} from '@components';
import {AddressRequest} from '../../screens/HomeScreens/ApprovedScreens/components/Addresses/AddressRequest';
import Profile from '@app/assets/image/icons/profile.svg';
import * as Progress from 'react-native-progress';
import BackgroundTimer from 'react-native-background-timer';

const ListCardItem = props => {
  const {appStyles, item, navigation} = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [decLoading, setDecLoading] = useState(false);
  const {provider} = useWalletConnectModal();
  const accountId = useSelector(state => state.auth.user.walletAddress);
  const apiToken = useSelector(state => state.auth.token);
  const listOrders = useSelector(state => state.journey.listOrders);

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
  let intervalId = useRef(null);
  const [second, setSecond] = useState(120);
  let counter = Math.floor(120 - (Date.now() - item.timeStamp) / 1000);

  useEffect(() => {
    changeTime();
    return () => {
      BackgroundTimer.clearInterval(intervalId.current);
    };
  }, [listOrders]);

  const changeTime = () => {
    intervalId.current = BackgroundTimer.setInterval(() => {
      counter--;
      if (counter <= 0) {
        BackgroundTimer.clearInterval(intervalId.current);
        // counter = 120;
        // setSecond(120);
        declineClick();
        setSecond(0);
        return;
      }
      setSecond(counter);
    }, 1000);
  };

  const accpetClick = async () => {
    stopSound();
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
        dispatch(setListJourney({data: []}));
        dispatch(setCurrent({data: response.data.data}));
        BackgroundTimer.clearInterval(intervalId.current);
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
            // dispatch(setCurrent({data: ''}));
            var newData = [...listOrders];
            const foundIndex = newData.findIndex(temp => temp.id === item.id);
            if (foundIndex !== -1) {
              newData.splice(foundIndex, 1);
            }
            dispatch(setListJourney({data: newData}));
            BackgroundTimer.clearInterval(intervalId.current);
            Alert.alert(
              '',
              Array.isArray(errorMesssage) ? errorMesssage[0] : errorMesssage,
            );
            return;
          }
        }
        displayErrors(error);
      });
  };
  const declineClick = () => {
    stopSound();
    var newData = [...listOrders];
    const foundIndex = newData.findIndex(temp => temp.id === item.id);
    if (foundIndex !== -1) {
      newData.splice(foundIndex, 1);
    }
    setDecLoading(true);
    journeyRequestDecline(item.id, apiToken)
      .then(response => {
        BackgroundTimer.clearInterval(intervalId.current);
        dispatch(setListJourney({data: newData}));
        setDecLoading(false);
      })
      .catch(error => {
        dispatch(setListJourney({data: newData}));
        if (counter > 0) {
          displayErrors(error);
        }
        setDecLoading(false);
      });
  };

  const openClick = () => {
    if (
      item.status !== 'STARTED' &&
      item.status !== 'WAIT_FOR_DRIVER_ARRIVAL' &&
      item.status !== 'DRIVER_ARRIVED'
    ) {
      navigation.navigate('Approved', {
        appStyles: appStyles,
        item: item,
        backFlag: false,
      });
    } else {
      navigation.navigate('Completed', {
        appStyles: appStyles,
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
          <Text textStyle="body14Regular">
            {calcuateDuration(item.eta / 60)}
          </Text>
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
            ₦ {currencyFormat(item.price)}
          </Text>
        </View>
      </View>
      {item.status === 'WAIT' && (
        <View style={styles.btnContainer}>
          <Button
            disabled={decLoading}
            title="Decline"
            onPress={declineClick}
            containerStyle={
              decLoading ? styles.btnLoadingDecline : styles.btnDecline
            }
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

export default ListCardItem;
