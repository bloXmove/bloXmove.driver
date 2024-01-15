import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  useColorScheme,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import dynamicStyles from './styles1';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import messaging from '@react-native-firebase/messaging';
import Moment from 'moment';
import {getBankList} from '../../HomeScreens/utils/api/bank';
import {openSetting} from '../../../helpers/getPermission';

const SetupProfileScreen = props => {
  const {navigation, route} = props;
  const appConfig = route.params.appConfig;
  const appStyles = route.params.appStyles;
  const accountId = route.params.accountId;
  const userType = route.params.userType;

  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const [isModalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Operation Information
  const [carType, setCarType] = useState('');
  const [optState, setOptState] = useState('');
  const [nin, setNIN] = useState('');
  const [driverClass, setClass] = useState('');
  const [driverNo, setNo] = useState('');
  const [expDate, setExp] = useState('');

  // Vehicle Information
  const [regNo, setReg] = useState('');
  const [maker, setMaker] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');

  // Bank Information
  const [bankName, setBank] = useState('');
  const [bankCode, setCode] = useState('');
  const [accNo, setAccNo] = useState('');
  const [holder, setHolder] = useState('');

  const [date, setDate] = useState(new Date());
  const [activeBirth, setActiveBirth] = useState(false);

  const [loading, setLoading] = useState(false);

  const ListState = [
    'Abia',
    'Adamawa',
    'Akwa Ibom',
    'Anambra',
    'Bauchi',
    'Bayelsa',
    'Benue',
    'Borno',
    'Cross River',
    'Delta',
    'Ebonyi',
    'Edo',
    'Ekiti',
    'Enugu',
    'Gombe',
    'Imo',
    'Jigawa',
    'Kaduna',
    'Kano',
    'Katsina',
    'Kebbi',
    'Kogi',
    'Kwara',
    'Lagos',
    'Nasarawa',
    'Niger',
    'Ogun',
    'Ondo',
    'Osun',
    'Oyo',
    'Plateau',
    'Rivers',
    'Sokoto',
    'Taraba',
    'Yobe',
    'Zamfara',
  ];
  const ListType = ['Car', 'Tricycle'];
  const ListClass = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'V'];
  const [ListBanks, setBankList] = useState([]);
  const ColorList = [
    'Black',
    'Blue',
    'Brown',
    'Green',
    'Grey',
    'Red',
    'Silver',
    'White',
    'Other',
  ];
  const ManufacturerList = [
    'Acura',
    'Alfa-Romeo',
    'Aston Martin',
    'Audi',
    'BMW',
    'Bentley',
    'Buick',
    'Cadilac',
    'Chevrolet',
    'Chrysler',
    'Daewoo',
    'Daihatsu',
    'Dodge',
    'Eagle',
    'Ferrari',
    'Fiat',
    'Fisker',
    'Ford',
    'Freighliner',
    'GMC - General Motors Company',
    'Genesis',
    'Geo',
    'Honda',
    'Hummer',
    'Hyundai',
    'Infinity',
    'Isuzu',
    'Jaguar',
    'Jeep',
    'Kla',
    'Lamborghini',
    'Land Rover',
    'Lexus',
    'Lincoln',
    'Lotus',
    'Mazda',
    'Maserati',
    'Maybach',
    'McLaren',
    'Mercedez-Benz',
    'Mercury',
    'Mini',
    'Mitsubishi',
    'Nissan',
    'Oldsmobile',
    'Panoz',
    'Plymouth',
    'Polestar',
    'Pontiac',
    'Porsche',
    'Ram',
    'Rivian',
    'Rolls_Royce',
    'Saab',
    'Saturn',
    'Smart',
    'Subaru',
    'Susuki',
    'Tesla',
    'Toyota',
    'Volkswagen',
    'Volvo',
  ];

  const curYear = new Date().getFullYear();
  const yearList = Array.from(new Array(50), (val, index) => curYear - index);

  useEffect(() => {
    requestUserPermission();
    getBanks();
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: '',
      headerTitle: 'Onboarding',
    });
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

  const getBanks = async () => {
    getBankList()
      .then(response => {
        setBankList(response.data.data);
      })
      .catch(error => {
        console.log('List Bank:', error);
      });
  };

  const updateDate = newDate => {
    if (activeBirth) {
      setBirth(Moment(newDate).format('YYYY-MM-DD'));
    } else {
      setExp(Moment(newDate).format('YYYY-MM-DD'));
    }
    setModalVisible(!isModalVisible);
  };

  // Change Vehicle Type
  const changeType = value => {
    setCarType(value);
    // Set Default value
    if (optState === '') {
      setOptState(ListState[0] ? ListState[0] : '');
    }
    if (driverClass === '') {
      setClass(ListClass[0] ? ListClass[0] : '');
    }
    if (maker === '') {
      setMaker(ManufacturerList[0] ? ManufacturerList[0] : '');
    }
    if (year === '') {
      setYear(yearList[0] ? yearList[0].toString() : '');
    }
    if (color === '') {
      setColor(ColorList[0] ? ColorList[0] : '');
    }
  };

  const validateEmail = emailAdd => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailAdd.trim());
  };
  const submit = async () => {
    if (
      firstName === '' ||
      lastName === '' ||
      address === '' ||
      state === '' ||
      birth === '' ||
      phone === '' ||
      email === '' ||
      carType === '' ||
      optState === '' ||
      nin === '' ||
      driverClass === '' ||
      driverNo === '' ||
      expDate === '' ||
      maker === '' ||
      model === '' ||
      year === '' ||
      color === '' ||
      regNo === '' ||
      bankName === '' ||
      accNo === '' ||
      holder === ''
    ) {
      Alert.alert('Please fill out missed ones', '');
      return;
    }
    // Email Validation
    if (!validateEmail(email)) {
      Alert.alert('Please input valid email address', '');
      return;
    }
    const tokenPermission = await requestUserPermission();
    if (tokenPermission === 'fail') {
      openSetting(
        'Please allow notification permission to get the push notification',
      );
      return;
    }
    const data = {
      walletAddress: accountId,
      phoneNumber: phone,
      driverType: userType === 0 ? 'COMPANY' : 'INDIVIDUAL',
      companyCode: 'string',
      firstName: firstName,
      lastName: lastName,
      address: address,
      state: state,
      birthday: birth,
      email: email.trim(),
      vehicleType: carType.toUpperCase(),
      operationState: optState,
      nationalID: nin,
      driverLicenseClass: driverClass,
      driverLicenseNo: driverNo,
      driverLicenseExpiredDate: expDate,
      vehicleRegistrationNo: regNo,
      vehicleManufacturer: maker,
      vehicleModel: model,
      vehicleYear: parseInt(year),
      vehicleColor: color,
      bankName: bankName,
      bankCode: bankCode,
      bankAccountName: accNo,
      bankAccountNumber: holder,
      deviceId: tokenPermission,
    };
    navigation.navigate('LoginStack', {
      screen: 'Confirm',
      params: {
        isSigningUp: true,
        appStyles,
        appConfig,
        data: data,
        userType: userType,
        accountId: accountId,
      },
    });
    return;
  };
  return (
    <KeyboardAwareScrollView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <KeyboardAvoidingView
        style={styles.avoidContainer}
        keyboardShouldPersistTaps="handled">
        <Image
          style={styles.image}
          source={appStyles.iconSet.city}
          size={200}
          color="white"
        />
        <View style={styles.boxContainer}>
          <Text style={styles.title}>Personal Data</Text>
          <View style={styles.inputBox}>
            <Text style={styles.text}>First Name</Text>
            <TextInput
              placeholder="Enter First Name"
              placeholderTextColor="#ddd"
              style={styles.InputContainer}
              onChangeText={value => setFirstName(value)}
              value={firstName}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Last Name</Text>
            <TextInput
              placeholder="Enter Last Name"
              placeholderTextColor="#ddd"
              style={styles.InputContainer}
              onChangeText={value => setLastName(value)}
              value={lastName}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Address</Text>
            <TextInput
              placeholder="Enter Address"
              placeholderTextColor="#ddd"
              style={styles.InputContainer}
              onChangeText={value => setAddress(value)}
              value={address}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>State</Text>
            <RNPickerSelect
              onValueChange={value => setState(value)}
              placeholder={{
                label: 'Select a State',
              }}
              items={ListState.map(item => {
                return {
                  label: item,
                  value: item,
                };
              })}
              style={{
                inputIOS: styles.inputSelect,
                inputAndroid: styles.inputSelect,
              }}
              useNativeAndroidPickerStyle={false}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Birthday</Text>
            <TouchableOpacity
              onPress={() => {
                setActiveBirth(true);
                setModalVisible(true);
              }}
              style={styles.birthContainer}>
              <Text
                style={[
                  styles.text,
                  styles.lightText,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    color:
                      birth === ''
                        ? '#ddd'
                        : appStyles.colorSet[colorScheme].mainTextColor,
                  },
                ]}>
                {birth === '' ? 'Enter Bithday' : birth}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Tel.</Text>
            <TextInput
              placeholder="Enter Phone Number"
              placeholderTextColor="#ddd"
              style={styles.InputContainer}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={value => setPhone(value)}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Email</Text>
            <TextInput
              placeholder="Enter Email"
              placeholderTextColor="#ddd"
              style={styles.InputContainer}
              autoCapitalize="none"
              textAlignVertical="top"
              keyboardType="email-address"
              onChangeText={value => setEmail(value)}
            />
          </View>
          <Text style={[styles.title, styles.mt20]}>Operating Information</Text>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Vehicle Type</Text>
            <RNPickerSelect
              onValueChange={value => changeType(value)}
              placeholder={{
                label: 'Select a Type',
              }}
              items={ListType.map(item => {
                return {
                  label: item,
                  value: item,
                };
              })}
              style={{
                inputIOS: styles.inputSelect,
                inputAndroid: styles.inputSelect,
              }}
              useNativeAndroidPickerStyle={false}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Operating State</Text>
            <RNPickerSelect
              value={optState}
              onValueChange={value => setOptState(value)}
              placeholder={{
                label: 'Select a State',
              }}
              items={ListState.map(item => {
                return {
                  label: item,
                  value: item,
                };
              })}
              style={{
                inputIOS: styles.inputSelect,
                inputAndroid: styles.inputSelect,
              }}
              useNativeAndroidPickerStyle={false}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>National ID (NIN)</Text>
            <TextInput
              placeholder="Enter NO."
              placeholderTextColor="#ddd"
              style={styles.InputContainer}
              keyboardType="numeric"
              onChangeText={value => setNIN(value)}
              value={nin}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Driver's License Class</Text>
            <RNPickerSelect
              value={driverClass}
              onValueChange={value => setClass(value)}
              placeholder={{
                label: 'Select a Class',
              }}
              items={ListClass.map(item => {
                return {
                  label: item,
                  value: item,
                };
              })}
              style={{
                inputIOS: styles.inputSelect,
                inputAndroid: styles.inputSelect,
              }}
              useNativeAndroidPickerStyle={false}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Driver's License No</Text>
            <TextInput
              placeholder="Enter NO."
              placeholderTextColor="#ddd"
              style={styles.InputContainer}
              onChangeText={value => setNo(value)}
              value={driverNo}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Expiry Date</Text>
            <TouchableOpacity
              onPress={() => {
                setActiveBirth(false);
                setModalVisible(true);
              }}
              style={styles.birthContainer}>
              <Text
                style={[
                  styles.text,
                  styles.lightText,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    color:
                      expDate === ''
                        ? '#ddd'
                        : appStyles.colorSet[colorScheme].mainTextColor,
                  },
                ]}>
                {expDate === '' ? 'Enter Expiry Date' : expDate}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.title, styles.mt20]}>Vehicle Information</Text>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Registration No</Text>
            <TextInput
              placeholder="Enter NO."
              placeholderTextColor="#ddd"
              style={styles.InputContainer}
              onChangeText={value => setReg(value)}
              value={regNo}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Maker</Text>
            <RNPickerSelect
              value={maker}
              onValueChange={value => setMaker(value)}
              placeholder={{
                label: 'Select Maker',
              }}
              items={ManufacturerList.map(item => {
                return {
                  label: item,
                  value: item,
                };
              })}
              style={{
                inputIOS: styles.inputSelect,
                inputAndroid: styles.inputSelect,
              }}
              useNativeAndroidPickerStyle={false}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Model</Text>
            <TextInput
              placeholder="Select Model"
              placeholderTextColor="#ddd"
              style={styles.InputContainer}
              onChangeText={value => setModel(value)}
              value={model}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Year</Text>
            <RNPickerSelect
              value={year}
              onValueChange={value => setYear(value)}
              placeholder={{
                label: 'Select Year',
              }}
              items={yearList.map(item => {
                return {
                  label: item.toString(),
                  value: item.toString(),
                };
              })}
              style={{
                inputIOS: styles.inputSelect,
                inputAndroid: styles.inputSelect,
              }}
              useNativeAndroidPickerStyle={false}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Color</Text>
            <RNPickerSelect
              value={color}
              onValueChange={value => setColor(value)}
              placeholder={{
                label: 'Select a Color',
              }}
              items={ColorList.map(item => {
                return {
                  label: item,
                  value: item,
                };
              })}
              style={{
                inputIOS: styles.inputSelect,
                inputAndroid: styles.inputSelect,
              }}
              useNativeAndroidPickerStyle={false}
            />
          </View>
          <Text style={[styles.title, styles.mt20]}>Bank Information</Text>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Bank Name</Text>
            <RNPickerSelect
              onValueChange={(value, index) => {
                setBank(value);
                setCode(ListBanks[index].code);
              }}
              placeholder={{
                label: 'Select Bank Name',
              }}
              items={ListBanks.map(item => {
                return {
                  label: item.name,
                  value: item.code,
                };
              })}
              style={{
                inputIOS: styles.inputSelect,
                inputAndroid: styles.inputSelect,
              }}
              useNativeAndroidPickerStyle={false}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Account Number</Text>
            <TextInput
              placeholder="Enter Acc. NO."
              placeholderTextColor="#ddd"
              keyboardType="numeric"
              style={styles.InputContainer}
              onChangeText={value => setAccNo(value)}
              value={accNo}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Account Holder</Text>
            <TextInput
              placeholder="Enter Account Holder"
              placeholderTextColor="#ddd"
              style={styles.InputContainer}
              onChangeText={value => setHolder(value)}
              value={holder}
            />
          </View>
          <TouchableOpacity
            style={styles.btnContainer}
            disabled={loading}
            onPress={() => submit()}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.btnText}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <Modal
        swipeDirection={['down']}
        onSwipeComplete={() => setModalVisible(false)}
        style={styles.modalView}
        isVisible={Platform.OS === 'ios' && isModalVisible}>
        <View style={styles.Modalcontent}>
          <TouchableOpacity
            onPress={() => setModalVisible(!isModalVisible)}
            style={styles.closeIcon}>
            <Icon name="close-outline" size={25} color={'black'} />
          </TouchableOpacity>
          {activeBirth && (
            <DateTimePicker
              value={date}
              maximumDate={new Date()}
              mode="date"
              style={styles.datePicker}
              display="spinner"
              themeVariant="light"
              onChange={(_event, date) => {
                setDate(date);
              }}
            />
          )}
          {!activeBirth && (
            <DateTimePicker
              value={date}
              minimumDate={new Date()}
              mode="date"
              style={styles.datePicker}
              display="spinner"
              themeVariant="light"
              onChange={(_event, date) => {
                setDate(date);
              }}
            />
          )}
          <TouchableOpacity
            style={[styles.btnContainer, styles.mt10]}
            onPress={() => {
              updateDate(date);
            }}>
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {Platform.OS === 'android' && isModalVisible === true && activeBirth && (
        <DateTimePicker
          value={date}
          maximumDate={new Date()}
          mode="date"
          style={styles.datePicker}
          display="spinner"
          themeVariant="light"
          onChange={(_event, date) => {
            setModalVisible(false);
            setDate(date);
            updateDate(date);
          }}
        />
      )}
      {Platform.OS === 'android' && isModalVisible === true && !activeBirth && (
        <DateTimePicker
          value={date}
          minimumDate={new Date()}
          mode="date"
          style={styles.datePicker}
          display="spinner"
          themeVariant="light"
          onChange={(_event, date) => {
            setModalVisible(false);
            setDate(date);
            updateDate(date);
          }}
        />
      )}
    </KeyboardAwareScrollView>
  );
};

SetupProfileScreen.propTypes = {
  appStyles: PropTypes.object,
  appConfig: PropTypes.object,
};

export default SetupProfileScreen;
