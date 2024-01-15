import React, {useState, useRef} from 'react';
import {View, TouchableOpacity, Alert, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import {displayErrors} from '../../../../helpers/displayErrors';
import {nftAPI, paymentAPI} from '../../utils';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {Button, COLORS, Input, Text} from '@components';
import {Controller, useForm} from 'react-hook-form';
import {required, validateInteger} from '@app/src/utils/validation';
import {styles} from './styles';

const WithdrawScreen = props => {
  const {navigation} = props;

  // paymentType = ENGN | BLXM | USDC
  const [paymentType, setPaymentType] = useState('ENGN');
  const [loading, setLoading] = useState(false);
  let intervalId = useRef(null);

  const currentUser = useSelector(state => state.auth.user);
  const accountId = useSelector(state => state.auth.user.walletAddress);
  const apiToken = useSelector(state => state.auth.token);

  const connector = useWalletConnect();

  const {
    control,
    handleSubmit,
    getValues,
    formState: {isValid: isFormValid},
  } = useForm({
    mode: 'onChange',
  });

  const confirmPayment = async ({amount}) => {
    if (connector && !connector.connected) {
      return connector.connect();
    }
    if (amount === '' || amount < 200) {
      Alert.alert(
        'The amount must be greater than 200. Please enter a valid value',
        '',
      );
      return;
    }
    var currency = '';
    if (paymentType === 0) {
      currency = 'ENGN';
    }
    if (paymentType === 1) {
      currency = 'BLXM';
    }
    if (paymentType === 2) {
      currency = 'USDC';
    }
    const amountRes = await nftAPI.getNFTBalance(accountId);
    if (amountRes.success !== true) {
      return;
    }
    if (parseInt(amountRes.data, 10) === 0) {
      Alert.alert('You have no money to withdraw');
      return;
    }
    if (parseInt(amountRes.data, 10) / Math.pow(10, 18) < amount) {
      Alert.alert('You can widthdraw less than ' + amountRes.data);
      return;
    }
    setLoading(true);
    const refundResult = await nftAPI.doRefund(accountId, amount, connector);
    if (refundResult.success !== true) {
      setLoading(false);
      return;
    }
    const data = {
      // currency: currency,
      currency: 'ENGN',
      amount: parseFloat(amount, 2).toFixed(2),
    };
    paymentAPI
      .createWithdraw(data, apiToken)
      .then(async response => {
        const command = response.data.data.paymentCommand;
        const signature = await nftAPI.approveERC(
          amount,
          accountId,
          command.value[0],
          command.value[1],
          connector,
        );
        if (signature.success !== true) {
          Alert.alert('Please authorize payment', '');
          setLoading(false);
          return;
        }
        navigation.navigate('Transaction');
      })
      .catch(error => {
        setLoading(false);
        displayErrors(error);
      });
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <AntDesignIcon name="arrowleft" size={24} color={COLORS.black} />
            </TouchableOpacity>
            <Text textStyle="body18Semibold">Withdraw</Text>
          </View>
          <Controller
            name="amount"
            control={control}
            defaultValue="200"
            rules={{
              required,
              pattern: validateInteger(),
              min: {
                value: 200,
                message:
                  'The amount must be greater than 200. Please enter a valid value',
              },
            }}
            render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
              <Input
                label="NGN"
                placeholder="Enter Amount"
                error={error?.message}
                keyboardType="number-pad"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType="done"
                // changeAmount(value);
              />
            )}
          />

          <View>
            <Text textStyle="body18Semibold">Destination</Text>
            <TouchableOpacity
              style={styles.bankButton}
              onPress={() => setPaymentType('ENGN')}>
              <Icon
                name={
                  paymentType === 'ENGN' ? 'radio-button-on' : 'radio-button-off'
                }
                color={paymentType === 'ENGN' ? COLORS.primary : COLORS.form}
                size={20}
              />
              <View style={[styles.info, styles.flexOne]}>
                <Text textStyle="body14SemiBold">Bank account</Text>
                <View style={styles.row}>
                  <Text style={styles.flexOne}>Bank Name: </Text>
                  <Text style={[styles.flexOne, {color: COLORS.body}]}>
                    {currentUser.bankName}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.flexOne}>Bank No:</Text>
                  <Text style={[styles.flexOne, {color: COLORS.body}]}>
                    {currentUser.bankAccountNumber}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.flexOne}>Account Holder:</Text>
                  <Text style={[styles.flexOne, {color: COLORS.body}]}>
                    {currentUser.firstName} {currentUser.lastName}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ChangeBank');
                }}>
                <Icon name="pencil" size={24} color={COLORS.black} />
              </TouchableOpacity>
            </TouchableOpacity>
            <View style={styles.divider} />
            {/* <TouchableOpacity
              style={styles.row}
              onPress={() => setPaymentType('BLXM')}>
              <Icon
                name={
                  paymentType === 'BLXM' || paymentType === 'USDC'
                    ? 'radio-button-on'
                    : 'radio-button-off'
                }
                color={
                  paymentType === 'BLXM' || paymentType === 'USDC'
                    ? COLORS.primary
                    : COLORS.form
                }
                size={20}
              />
              <View style={[styles.info, styles.flexOne]}>
                <Text>Wallet</Text>
                <View style={styles.row}>
                  <Text style={styles.flexOne}>Address:</Text>
                  <Text style={[styles.flexOne, {color: COLORS.body}]}>
                    {accountId}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.row, styles.center]}
                  onPress={() => setPaymentType('BLXM')}>
                  <Icon
                    name={
                      paymentType === 'BLXM'
                        ? 'radio-button-on'
                        : 'radio-button-off'
                    }
                    color={paymentType === 'BLXM' ? COLORS.primary : COLORS.form}
                    size={20}
                  />
                  <Text style={styles.info}>BLXM</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.row, styles.center]}
                  onPress={() => setPaymentType('USDC')}>
                  <Icon
                    name={
                      paymentType === 'USDC'
                        ? 'radio-button-on'
                        : 'radio-button-off'
                    }
                    color={paymentType === 'USDC' ? COLORS.primary : COLORS.form}
                    size={20}
                  />
                  <Text style={styles.info}>USDC</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <Text style={styles.description}>
              The equivalent of your amount in tokens will be sent to our wallet.
            </Text>
            <Text>
              ₦{getValues('amount')} ={' '}
              {((blxmRate / ngnRate) * getValues('amount')).toFixed(2)} BLXM and{' '}
              {((usdcRate / ngnRate) * getValues('amount')).toFixed(2)} USDC
            </Text> */}
          </View>
        </View>

        <Button
          disabled={!isFormValid || loading}
          title="Withdraw"
          onPress={handleSubmit(confirmPayment)}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default WithdrawScreen;
