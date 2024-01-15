import React, {useState, useRef} from 'react';
import {View, SafeAreaView, Platform, TouchableOpacity} from 'react-native';
import dynamicStyles from './styles';
import {Text, Input, Button} from '@components';
import {
  required,
  getNamePattern,
  getLicencePattern,
} from '@app/src/utils/validation';
import {InputSelect} from '@app/src/components/Input/InputSelect';
import {Controller, useForm} from 'react-hook-form';
import svgs from '../../../../assets/svg/svgs';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ListState, ListClass} from '@app/src/lib/constants';

const IndentificationScreen = props => {
  const {navigation, route} = props;
  const accountId = route.params.accountId;
  const userType = route.params.userType;
  const personalData = route.params.data;
  const {
    setFocus,
    setError,
    control,
    handleSubmit,
    getValues,
    formState: {isValid: isFormValid, errors},
  } = useForm({
    mode: 'onChange',
  });

  const styles = dynamicStyles();

  const [loading, setLoading] = useState(false);
  const expdateRef = useRef(null);
  const stateRef = useRef(null);

  const saveAction = async data => {
    const newData = {...data, ...personalData};
    navigation.navigate('Vehicle', {
      data: newData,
      accountId: accountId,
      userType: userType,
    });
  };
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeview}>
      <KeyboardAwareScrollView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.scrollContainer}>
        <View style={styles.container}>
          <View>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={() => goBack()}>
                <svgs.Back />
              </TouchableOpacity>
              <Text textStyle="body18Medium" style={styles.title}>
                Identification
              </Text>
            </View>
            <Text textStyle="body10Regular" style={styles.step}>
              Step 2 of 4
            </Text>
            <Text textStyle="body14Regular" style={styles.description}>
              Please provide your drivers licence details below for
              verification.
            </Text>
            <Controller
              name="driverLicenseNo"
              control={control}
              defaultValue=""
              rules={{
                required,
                pattern: getLicencePattern(),
              }}
              render={({
                field: {onChange, value, onBlur},
                fieldState: {error},
              }) => (
                <>
                  <Input
                    label="Driver’s license"
                    placeholder="Enter Driver’s license"
                    error={error?.message}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    returnKeyType="done"
                    autoCorrect={false}
                    onSubmitEditing={() => expdateRef.current?.focus()}
                    inputProps={{
                      autoCorrect: false,
                    }}
                  />
                </>
              )}
            />
            <Controller
              name="driverLicenseExpiredDate"
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
                  label="License expiring date"
                  placeholder="Enter expiring date"
                  error={error?.message}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  returnKeyType="next"
                  inputType="date"
                  rightIconName="calendar"
                  minimumDate={new Date()}
                  onSubmitEditing={() => setFocus('email')}
                />
              )}
            />
            <Controller
              name="driverLicenseClass"
              control={control}
              rules={{required}}
              defaultValue=""
              render={({field: {onChange, value, ...field}}) => (
                <InputSelect
                  items={ListClass}
                  onClose={() => {
                    if (!value) {
                      onChange(ListClass[0].value);
                    }
                  }}
                  onValueChange={onChange}
                  inputProps={{
                    ...field,
                    label: 'Driver class',
                    value,
                    onChangeText: onChange,
                  }}
                />
              )}
            />
            <Controller
              name="nationalID"
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
                  label="NIN Number"
                  placeholder="Enter NIN number"
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
                  inputProps={{
                    autoCorrect: false,
                  }}
                />
              )}
            />
            <Controller
              name="operationState"
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
                    label: 'Operating State',
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

export default IndentificationScreen;
