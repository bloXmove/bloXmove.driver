import React, {useState, useEffect, useRef} from 'react';
import {View, SafeAreaView, Platform, TouchableOpacity} from 'react-native';
import dynamicStyles from './styles';
import {Text, Input, Button} from '@components';
import {required, getNamePattern} from '@app/src/utils/validation';
import {InputSelect} from '@app/src/components/Input/InputSelect';
import {Controller, useForm} from 'react-hook-form';
import {getBankList} from '../../../screens/HomeScreens/utils/api/bank';
import svgs from '../../../../assets/svg/svgs';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const PaymentInformationScreen = props => {
  const {navigation, route} = props;
  const accountId = route.params.accountId;
  const userType = route.params.userType;
  const personalData = route.params.data;
  const [ListBanks, setBankList] = useState([]);

  const accNameRef = useRef();
  const bankNameRef = useRef();
  const {
    setFocus,
    control,
    handleSubmit,
    getValues,
    formState: {isValid: isFormValid},
  } = useForm({
    mode: 'onChange',
  });

  const styles = dynamicStyles();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getBanks();
  }, []);

  const getBanks = async () => {
    getBankList()
      .then(response => {
        const data = response.data.data;
        const newData = [];
        newData.push({
          value: '',
          label: '',
        });
        data.map(item => {
          if (newData.findIndex(x => x.value === item.code) === -1) {
            const temp = {};
            temp.value = item.code;
            temp.label = item.name;
            newData.push(temp);
          }
        });
        setBankList(newData);
        // setBankList(
        //   response.data.data.map(item => {
        //     return {value: item.code, label: item.name};
        //   }),
        // );
      })
      .catch(error => {
        console.log('List Bank:', error);
      });
  };

  const saveAction = async data => {
    const newData = {...data, ...personalData};
    // const bankName = ListBanks[bankCod]
    let bankName = ListBanks.find(item => item.value === data.bankCode)?.label;
    newData.bankName = bankName;
    navigation.navigate('Summary', {
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
                Payment Information
              </Text>
            </View>
            <Text textStyle="body10Regular" style={styles.step}>
              Step 4 of 4
            </Text>
            <Text textStyle="body14Regular" style={styles.description}>
              Please fill the forms to provide your vehicle details
            </Text>
            <Controller
              name="bankAccountNumber"
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
                  label="Account number"
                  placeholder="Enter account number"
                  error={error?.message}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  returnKeyType="next"
                  onSubmitEditing={() => accNameRef.current?.focus()}
                />
              )}
            />
            <Controller
              name="bankAccountName"
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
                  label="Account name"
                  ref={accNameRef}
                  placeholder="Enter account name"
                  error={error?.message}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    Platform.OS === 'android'
                      ? bankNameRef.current?.focus()
                      : bankNameRef.current?.togglePicker(true)
                  }
                />
              )}
            />
            <Controller
              name="bankCode"
              control={control}
              rules={{required}}
              defaultValue=""
              render={({field: {onChange, value, ...field}}) => (
                <InputSelect
                  items={ListBanks}
                  ref={Platform.OS === 'ios' ? bankNameRef : null}
                  pickerProps={{
                    ref: Platform.OS === 'android' ? bankNameRef : null,
                  }}
                  onClose={() => {
                    if (!value) {
                      onChange(ListBanks[0]?.value);
                    }
                  }}
                  onValueChange={onChange}
                  inputProps={{
                    ...field,
                    label: 'Bank name',
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

export default PaymentInformationScreen;
