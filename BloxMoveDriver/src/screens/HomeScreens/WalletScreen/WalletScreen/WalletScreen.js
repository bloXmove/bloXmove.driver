import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {changeNFTBalance} from '../../utils/api/nft';
import {Bank} from '@app/assets/image/icons';
import {COLORS, Text} from '@components';
import {styles} from './styles';
import {currencyFormat} from '@app/src/helpers';

const WalletScreen = props => {
  const {navigation} = props;
  const currentUser = useSelector(state => state.auth.user);
  const accountId = useSelector(state => state.auth.user.walletAddress);
  const nft = useSelector(state => state.payment.nft);
  const reward = 0;
  const [loading, setLoading] = useState(false);
  const [activeTab, setActive] = useState(0);
  // const [nft, setNFT] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getNFT();
    });
    return unsubscribe;
  }, [navigation]);

  const getNFT = async () => {
    setLoading(true);
    try {
      await dispatch(changeNFTBalance(accountId));
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        <View>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name="arrowleft" size={24} color={COLORS.black} />
            </TouchableOpacity>
            <Text textStyle="body18Semibold">Wallet</Text>
          </View>
          {loading ? (
            <ActivityIndicator style={{height: 200}} color="black" />
          ) : (
            <View style={styles.balance}>
              <Text textStyle="body18Regular">NFTicket Balance</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Transaction');
                }}
                style={styles.balanceActions}>
                <Text textStyle="header24">NGN(₦) {nft}</Text>
                <Icon name="right" size={20} color={COLORS.black} />
              </TouchableOpacity>
              <View style={styles.balanceActions}>
                {currentUser.driverType &&
                  currentUser.driverType !== 'COMPANY' && (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('CardPayment')}
                      style={[
                        styles.halfButton,
                        {backgroundColor: COLORS.error},
                      ]}
                      activeOpacity={0.9}>
                      <Icon name="minus" size={20} color={COLORS.white} />
                      <Text
                        textStyle="body14SemiBold"
                        style={{color: COLORS.white}}>
                        {' '}
                        Withdraw
                      </Text>
                    </TouchableOpacity>
                  )}
              </View>
            </View>
          )}
          {/* Reward */}

          {/* <View style={styles.balanceContainer}>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={activeTab === 0 ? styles.activeTab : styles.nonActiveTab}
                disabled={activeTab === 0 || loading ? true : false}
                onPress={() => setActive(0)}>
                <Text textStyle="body18Semibold" style={styles.whiteText}>
                  Ride
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={activeTab === 1 ? styles.activeTab : styles.nonActiveTab}
                disabled={activeTab === 1 || loading ? true : false}
                onPress={() => setActive(1)}>
                <Text textStyle="body18Semibold" style={styles.whiteText}>
                  Reward
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.insideContainer}>
              {loading ? (
                <ActivityIndicator
                  style={styles.loadingContainer}
                  color="black"
                />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Transaction');
                  }}
                  style={
                    currentUser.driverType !== 'COMPANY'
                      ? styles.balanceTitle
                      : styles.balanceActions
                  }>
                  <Text textStyle="header24">
                    NGN(₦) {currencyFormat(activeTab === 0 ? nft : reward)}
                  </Text>
                  <Icon name="right" size={20} color={COLORS.black} />
                </TouchableOpacity>
              )}

              <View style={styles.balanceActions}>
                {currentUser.driverType &&
                  (currentUser.driverType !== 'COMPANY' ||
                    (currentUser.driverType === 'COMPANY' &&
                      activeTab !== 0)) && (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('CardPayment')}
                      style={[
                        styles.halfButton,
                        {backgroundColor: COLORS.error},
                      ]}
                      activeOpacity={0.9}>
                      <Icon name="minus" size={20} color={COLORS.white} />
                      <Text
                        textStyle="body14SemiBold"
                        style={{color: COLORS.white}}>
                        {' '}
                        Withdraw
                      </Text>
                    </TouchableOpacity>
                  )}
              </View>
            </View>
          </View> */}
        </View>
        {currentUser.driverType && currentUser.driverType !== 'COMPANY' && (
          <View style={styles.cards}>
            <Text textStyle="body14SemiBold">Saved Payment Method</Text>
            <View style={styles.bankContainer}>
              <View>
                <Bank style={styles.icon} />
              </View>
              <View style={styles.bankNumber}>
                <Text textStyle="body18Regular">{currentUser.bankName}</Text>
                <Text textStyle="body18Regular">
                  {currentUser.bankAccountNumber}
                </Text>
                <Text textStyle="body18Regular">
                  {currentUser.bankAccountName}
                </Text>
              </View>
            </View>
          </View>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default WalletScreen;
