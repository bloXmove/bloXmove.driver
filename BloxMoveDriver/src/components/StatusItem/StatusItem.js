import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  useColorScheme,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import dynamicStyles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, Text} from '@components';
import Svgs from '../../../assets/svg/svgs';
import {nftAPI} from '../../screens/HomeScreens/utils';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';
import {currencyFormat} from '@app/src/helpers';

const StatusItem = props => {
  const {appStyles, navigation, driverStatus, toggleSwitch} = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const [loading, setLoading] = useState(false);
  const accountId = useSelector(state => state.auth.user.walletAddress);
  const nftbalance = useSelector(state => state.payment.nft);
  const marginBottom = useRef(new Animated.Value(-70)).current;
  const startPos = useSharedValue(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (accountId) {
      setLoading(true);
      dispatch(nftAPI.changeNFTBalance(accountId));
      setLoading(false);
    }
  }, [accountId]);
  const tap = Gesture.Pan()
    .runOnJS(true)
    .onStart(event => {
      startPos.value = event.y;
    })
    .onEnd(e => {
      if (startPos.value < e.y) {
        Animated.timing(marginBottom, {
          toValue: -70,
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
  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={tap}>
        <Animated.View
          style={[
            styles.boxContainer,
            {
              marginBottom: marginBottom,
            },
          ]}>
          <View style={styles.handle} />
          <TouchableOpacity
            onPress={toggleSwitch}
            style={styles.buttonContainer}>
            {driverStatus === 'AVAILABLE' && <Svgs.Stop />}
            {driverStatus === 'NOT_AVAILABLE' && <Svgs.Go />}
            {driverStatus === 'BUSY' && <Svgs.Busy />}
          </TouchableOpacity>
          {driverStatus === 'AVAILABLE' && (
            <Text textStyle="body14Regular" style={styles.inputLabel}>
              You are current online, you may receive ride request anytime now.
            </Text>
          )}
          {driverStatus === 'NOT_AVAILABLE' && (
            <Text textStyle="body14Regular" style={styles.inputLabel}>
              You are current offline, click the “go” button to go online.
            </Text>
          )}
          {driverStatus === 'BUSY' && (
            <Text textStyle="body14Regular" style={styles.inputLabel}>
              You have an ongoing ride.
            </Text>
          )}
          <View style={styles.balanceContainer}>
            <View>
              <Text textStyle="body14Regular" style={styles.inputLabel}>
                Total Earnings
              </Text>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text textStyle="header24">₦ {currencyFormat(nftbalance)}</Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Wallet')}
              activeOpacity={1}>
              <Icon name="right" size={25} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default StatusItem;
