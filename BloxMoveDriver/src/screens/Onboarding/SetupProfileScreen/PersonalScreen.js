import React, {useEffect, useRef, useState} from 'react';
import {View, SafeAreaView, Platform, Alert} from 'react-native';
import dynamicStyles from './styles';
import messaging from '@react-native-firebase/messaging';
import PhoneInput from 'react-native-phone-input';
import {Text, Input, InputEmail, Button} from '@components';
import {required, getNamePattern} from '@app/src/utils/validation';
import {InputSelect} from '@app/src/components/Input/InputSelect';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ListState} from '@app/src/lib/constants';

const PersonalScreen = props => {
  const {navigation, route} = props;
  const accountId = route.params.accountId;
  const userType = route.params.userType;
  const lastNameRef = useRef();
  const birthRef = useRef();
  const addressRef = useRef();
  const stateRef = useRef();
  const {
    setFocus,
    control,
    handleSubmit,
    getValues,
    formState: {isValid: isFormValid, errors},
  } = useForm({
    mode: 'onChange',
  });

  const styles = dynamicStyles();

  const [loading, setLoading] = useState(false);
  const phoneRef = useRef();

  useEffect(() => {
    requestUserPermission();
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const token = await messaging().getToken();
      return token;
    }
    return 'fail';
  };

  const saveAction = async data => {
    if (!phoneRef.current?.isValidNumber()) {
      Alert.alert('', 'Please input valid phone number');
      return;
    }
    if (phoneRef.current?.getCountryCode() !== '234') {
      Alert.alert('', 'Please input nigeria phone number');
      return;
    }
    data.phoneNumber = phoneRef.current.getValue();
    navigation.navigate('Identify', {
      data: data,
      accountId: accountId,
      userType: userType,
    });
  };
  return (
    <SafeAreaView style={styles.safeview}>
      <KeyboardAwareScrollView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.scrollContainer}>
        <View style={styles.container}>
          <View>
            <Text textStyle="body18Medium" style={styles.headerContainer}>
              Personal information
            </Text>
            <Text textStyle="body10Regular" style={styles.step}>
              Step 1 of 4
            </Text>
            <Text textStyle="body14Regular" style={styles.description}>
              As an individual driver, we need some information from you which
              will be verified by our team
            </Text>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{
                required,
                pattern: getNamePattern(),
              }}
              render={({
                field: {onChange, value, onBlur},
                fieldState: {error},
              }) => (
                <Input
                  label="First name"
                  placeholder="Enter first name"
                  error={error?.message}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  returnKeyType="next"
                  onSubmitEditing={() => lastNameRef.current?.focus()}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{
                required,
                pattern: getNamePattern(),
              }}
              render={({
                field: {onChange, value, onBlur},
                fieldState: {error},
              }) => (
                <Input
                  label="Last name"
                  ref={lastNameRef}
                  placeholder="Enter last name"
                  error={error?.message}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  returnKeyType="next"
                  onSubmitEditing={() => setFocus('email')}
                />
              )}
            />
            <InputEmail
              controllerProps={{
                control,
                defaultValue: '',
              }}
              inputProps={{
                returnKeyType: 'next',
                onSubmitEditing: () => {
                  phoneRef.current?.focus();
                },
              }}
            />
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              rules={{
                required,
                // pattern: getNamePattern(),
              }}
              render={({
                field: {onChange, value, onBlur},
                fieldState: {error},
              }) => (
                <View style={styles.phoneInputContainer}>
                  <Text style={styles.phoneNumberLabel}>Phone Number</Text>
                  <PhoneInput
                    ref={phoneRef}
                    initialCountry={'ng'}
                    style={styles.phoneInput}
                    textStyle={styles.phoneInputText}
                    placeholder="Enter Phone Number"
                    textProps={{
                      returnKeyType: 'done',
                      placeholder: 'Enter Phone Number',
                      onChangeText: async data => {
                        value = data;
                        await phoneRef.current?.setValue(data);
                        phoneRef.current?.isValidNumber(data)
                          ? onChange(data)
                          : onChange('');
                      },
                      onSubmitEditing: () => {
                        // birthRef.current?.focus();
                      },
                    }}
                    offset={10}
                  />
                  {errors.phoneNumber && (
                    <Text style={styles.error}>
                      Please enter a valid mobile number.
                    </Text>
                  )}
                </View>
              )}
            />
            <Controller
              name="birthday"
              control={control}
              defaultValue=""
              rules={{
                required,
              }}
              render={({
                field: {onChange, value, onBlur},
                fieldState: {error},
              }) => (
                <Input
                  label="Date of birth"
                  placeholder="Enter date of birth"
                  // ref={birthRef}
                  error={error?.message}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  inputType="date"
                  rightIconName="calendar"
                  maximumDate={new Date()}
                  returnKeyType="next"
                  onSubmitEditing={() => setFocus('email')}
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{
                required,
              }}
              render={({
                field: {onChange, value, onBlur},
                fieldState: {error},
              }) => (
                <Input
                  label="Address"
                  placeholder="Enter address"
                  error={error?.message}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    Platform.OS === 'android'
                      ? stateRef.current?.focus()
                      : stateRef.current?.togglePicker(true);
                  }}
                />
              )}
            />
            <Controller
              name="state"
              control={control}
              rules={{required}}
              defaultValue=""
              render={({field: {onChange, value, ...field}}) => (
                <InputSelect
                  items={ListState}
                  onClose={() => {
                    if (!value) {
                      onChange(ListState[0].value);
                    }
                  }}
                  ref={Platform.OS === 'ios' ? stateRef : null}
                  pickerProps={{
                    ref: Platform.OS === 'android' ? stateRef : null,
                  }}
                  onValueChange={onChange}
                  inputProps={{
                    ...field,
                    label: 'State',
                    value,
                    onChangeText: onChange,
                  }}
                />
              )}
            />
            <Button
              onPress={handleSubmit(saveAction)}
              disabled={loading || !isFormValid}
              title="Continue"
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default PersonalScreen;
