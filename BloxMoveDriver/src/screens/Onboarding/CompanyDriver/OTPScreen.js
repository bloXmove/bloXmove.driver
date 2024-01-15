import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  Platform,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import dynamicStyles from './styles';

import deviceStorage from '../../utils/AuthDeviceStorage';
import {useDispatch} from 'react-redux';
import {
  createCompanyAccount,
  getToken,
  loginActions,
} from '../../utils/api/actions';
import svgs from '../../../../assets/svg/svgs';
import {Text, Button} from '@components';
import {displayErrors} from '@app/src/helpers';
import {getDeviceId, openSetting} from '@app/src/helpers';
import {getSignatureLogin} from '@app/src/screens/HomeScreens/utils/api/nft';

const codeInputCellCount = 8;

const OTPScreen = props => {
  const {navigation, route} = props;
  const appStyles = route.params.appStyles;
  const accountId = route.params.accountId;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const [codeInputValue, setCodeInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const myCodeInput = useBlurOnFulfill({
    codeInputValue,
    value: codeInputValue,
    cellCount: codeInputCellCount,
  });
  const [codeInputProps, getCellOnLayoutHandler] = useClearByFocusCell({
    codeInputValue,
    value: codeInputValue,
    setCodeInputValue,
    setValue: setCodeInputValue,
  });
  const renderCodeInputCell = ({index, symbol, isFocused}) => {
    const hasValue = Boolean(symbol);
    let textChild = symbol;

    if (isFocused) {
      textChild = <Cursor />;
    }
    if (hasValue) {
      textChild = '*';
    }

    return (
      <TextInput
        key={index}
        style={[
          styles.codeInputCell,
          isFocused && styles.focusCell,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            marginLeft: index === 0 ? 0 : 8,
            paddingTop: hasValue && Platform.OS === 'ios' ? 10 : 5,
          },
        ]}
        onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </TextInput>
    );
  };
  useEffect(() => {
    codeInputValue.length === 8 ? setLoading(false) : setLoading(true);
  }, [codeInputValue]);

  const dispatch = useDispatch();

  const confirmVerify = async () => {
    setLoading(true);
    const tokenPermission = await getDeviceId();
    if (tokenPermission === 'fail') {
      setLoading(false);
      openSetting(
        'Please allow notification permission to get the push notification',
      );
      return;
    }
    const data = {
      walletAddress: accountId,
      companyCode: codeInputValue,
      deviceId: tokenPermission,
    };
    createCompanyAccount(data)
      .then(response => {
        loginAction();
      })
      .catch(error => {
        setLoading(false);
        displayErrors(error);
      });
    // deviceStorage.setUserType('COMPANY');
  };

  const loginAction = async () => {
    const signatureResult = await getSignatureLogin(accountId, '');
    if (signatureResult.success !== true) {
      setLoading(false);
      Alert.alert('Please grant access');
      return;
    }
    const result = await getToken(accountId, 'COMPANY');
    if (result.success === true) {
      await deviceStorage.setShouldShowOnboardingFlow('true');
      await deviceStorage.setAccountNumber(accountId);
      const token = result.data.token;
      await deviceStorage.setUserType('COMPANY');
      await dispatch(loginActions(token));
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'HomeStack',
          },
        ],
      });
    } else {
      setLoading(false);
      // signUp();
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}>
        <View>
          <View style={styles.headerContainer}>
            {/* <TouchableOpacity
              style={styles.btnToggle}
              onPress={() => navigation.goBack()}>
              <svgs.Back />
            </TouchableOpacity> */}
            <Text textStyle="body18Medium" style={styles.title}>
              Company code
            </Text>
          </View>
          <Text>Please enter your company’s 8 digit code below</Text>
          <CodeField
            ref={myCodeInput}
            {...codeInputProps}
            value={codeInputValue}
            onChangeText={setCodeInputValue}
            cellCount={codeInputCellCount}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={renderCodeInputCell}
          />
          <Button
            title="Continue"
            containerStyle={styles.button}
            onPress={confirmVerify}
            disabled={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OTPScreen;
