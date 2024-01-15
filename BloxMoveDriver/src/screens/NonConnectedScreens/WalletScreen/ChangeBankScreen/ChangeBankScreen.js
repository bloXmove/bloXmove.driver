import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Button,
  COLORS,
  Input,
  Text,
  TNActivityIndicator,
} from '../../../../components';
import {useSelector, connect, useDispatch} from 'react-redux';
import {setUserData} from '../../../Onboarding/redux';
import {displayErrors} from '../../../../helpers/displayErrors';
import {getDeviceId} from '../../../../helpers/getDeviceId';
import {openSetting} from '../../../../helpers/getPermission';
import {getNamePattern, required} from '@app/src/utils/validation';
import {Controller, useForm} from 'react-hook-form';
import {InputSelect} from '@app/src/components/Input/InputSelect';
import Icon from 'react-native-vector-icons/AntDesign';
import {styles} from './styles';
import {bankAPI, userAPI} from '../../utils';

const ChangeBankScreen = props => {
  const {navigation} = props;

  const currentUser = useSelector(state => state.auth.user);
  const apiToken = useSelector(state => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [ListBanks, setBankList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getBanks();
  }, []);
  const getBanks = () => {
    setPageLoading(true);
    bankAPI
      .getBankList()
      .then(response => {
        setBankList(
          response.data.data.map(item => {
            return {value: item.code, label: item.name};
          }),
        );
        setPageLoading(false);
      })
      .catch(error => {
        setPageLoading(false);
        console.log(error);
      });
  };

  const {
    control,
    handleSubmit,
    formState: {isValid: isFormValid},
  } = useForm({
    mode: 'onChange',
  });

  const saveCard = async ({firstName, lastName, accountNumber, bankCode}) => {
    setLoading(true);
    const tokenPermission = await getDeviceId();
    if (tokenPermission === 'fail') {
      setLoading(false);
      openSetting(
        'Please allow notification permission to get the push notification',
      );
      return;
    }
    const data = currentUser;
    data.bankCode = bankCode;
    data.bankName = ListBanks.find(item => item.value === bankCode)?.label;
    data.firstName = firstName;
    data.lastName = lastName;
    data.bankAccountNumber = accountNumber;
    data.deviceId = tokenPermission;
    data.companyCode = 'string';
    userAPI
      .updateUserData(data, apiToken)
      .then(response => {
        dispatch(setUserData({data: data}));
        setLoading(false);
        navigation.goBack();
      })
      .catch(error => {
        displayErrors(error);
        setLoading(false);
      });
  };

  if (pageLoading) {
    return <TNActivityIndicator />;
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="close" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text textStyle="body18Semibold">Edit bank account</Text>
        </View>
        <Controller
          name="accountNumber"
          control={control}
          defaultValue={currentUser.bankAccountNumber ?? ''}
          rules={{
            required,
          }}
          render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
            <Input
              label="Account Number"
              placeholder="Account Number"
              error={error?.message}
              keyboardType="decimal-pad"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              returnKeyType="done"
            />
          )}
        />
        <Controller
          name="firstName"
          control={control}
          defaultValue={currentUser.firstName ? currentUser.firstName : ''}
          rules={{
            required,
            pattern: getNamePattern(),
          }}
          render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
            <Input
              label="First name"
              placeholder="Enter first name"
              error={error?.message}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              returnKeyType="next"
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue={currentUser?.lastName ?? ''}
          rules={{
            required,
            pattern: getNamePattern(),
          }}
          render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
            <Input
              label="Last name"
              placeholder="Enter last name"
              error={error?.message}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              returnKeyType="next"
            />
          )}
        />
        <Controller
          name="bankCode"
          control={control}
          rules={{required}}
          defaultValue={currentUser.bankCode}
          render={({field: {onChange, value, ...field}}) => (
            <InputSelect
              items={ListBanks}
              onClose={() => {
                if (!value) {
                  onChange(ListBanks[0]?.value);
                }
              }}
              onValueChange={onChange}
              inputProps={{
                ...field,
                label: 'Bank Name',
                value,
                onChangeText: onChange,
              }}
            />
          )}
        />
      </View>
      <Button
        onPress={handleSubmit(saveCard)}
        disabled={!isFormValid || loading}
        title="Save Changes"
      />
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = ({auth}) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps, {})(ChangeBankScreen);
