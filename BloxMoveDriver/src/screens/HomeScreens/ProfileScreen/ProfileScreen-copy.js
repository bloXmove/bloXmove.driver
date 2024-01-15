import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  Alert,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  useColorScheme,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import dynamicStyles from './styles';
import deviceStorage from '../../utils/AuthDeviceStorage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import {TNActivityIndicator} from '../../../components';
import {updateUserData, deleteAccount} from '../utils/api/users';
import Svgs from '../../../../assets/svg/svgs';
import {useSelector, useDispatch, connect} from 'react-redux';
import {setUserData} from '../../Onboarding/redux';
import {openSetting} from '../../../helpers/getPermission';
import RNPickerSelect from 'react-native-picker-select';
import {getDeviceId} from '../../../helpers/getDeviceId';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';
import {displayErrors} from '../../../helpers/displayErrors';

const ProfileScreen = props => {
  const {route, navigation} = props;
  const appStyles = route.params.appStyles;
  const appConfig = route.params.appConfig;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  let currentTheme = appStyles.navThemeConstants[colorScheme];
  const currentUser = useSelector(state => state.auth.user);
  const apiToken = useSelector(state => state.auth.token);
  const {provider} = useWalletConnectModal();

  const [profileImg, setImg] = useState(appStyles.iconSet.avatarBlank);

  const [fullName, setFullName] = useState(
    currentUser.firstName + ' ' + currentUser.lastName,
  );
  const [email, setEmail] = useState(currentUser.email);
  const [address, setAddress] = useState(currentUser.address);
  const [plate, setPlate] = useState(currentUser.vehicleManufacturer);
  const [driverNo, setNo] = useState(currentUser.vehicleRegistrationNo);
  const [color, setColor] = useState(currentUser.vehicleColor);
  const [model, setModel] = useState(currentUser.vehicleModel);
  const [valid, setValid] = useState(currentUser.driverLicenseExpiredDate);

  const [editable, setEditable] = useState(false);

  // Account
  const [accountNumber, setNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  // User Type
  const [userType, setType] = useState('');
  const [loading, setLoading] = useState(false);

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

  const dispatch = useDispatch();

  useEffect(() => {
    getAccountNumber();
  }, []);

  const getAccountNumber = async () => {
    let vNumber = await deviceStorage.getAccountNumber();
    let uType = await deviceStorage.getUserType();
    setType(uType);
    setNumber(vNumber);
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={styles.btnToggle} onPress={openDrawer}>
          <Icon name="menu-outline" size={30} color={currentTheme.fontColor} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={styles.btnHelp}
          onPress={() =>
            navigation.navigate('DetailHelp', {
              appStyles: appStyles,
              appConfig: appConfig,
            })
          }>
          <Icon
            name="help-circle-outline"
            size={30}
            color={currentTheme.fontColor}
          />
        </TouchableOpacity>
      ),
    });
  }, []);
  const openDrawer = () => {
    Keyboard.dismiss();
    props.navigation.openDrawer();
  };

  const startUpload = async source => {
    setImg({uri: source.path});
    setModalVisible(false);
  };

  const onLaunchCamera = () => {
    ImagePicker.openCamera({
      cropping: false,
    }).then(image => {
      startUpload(image);
    });
  };

  const onOpenPhotos = () => {
    ImagePicker.openPicker({
      cropping: false,
    }).then(image => {
      startUpload(image);
    });
  };

  const changeAvatar = type => {
    if (type === 0) {
      onLaunchCamera();
    } else {
      onOpenPhotos();
    }
  };

  // Save or Edit
  const validateEmail = emailAddress => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailAddress.trim());
  };
  const editAction = async () => {
    if (editable) {
      if (validateEmail(email) === false) {
        Alert.alert('', 'Please input valid email address');
        return;
      }
      const tokenPermission = await getDeviceId();
      if (tokenPermission === 'fail') {
        openSetting(
          'Please allow notification permission to get the push notification',
        );
        return;
      }
      setLoading(true);
      const data = {
        walletAddress: accountNumber,
        phoneNumber: currentUser.phoneNumber,
        driverType: currentUser.driverType,
        companyCode: 'string',
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        address: address,
        state: currentUser.state,
        birthday: currentUser.birthday,
        email: email,
        vehicleType: currentUser.vehicleType,
        operationState: currentUser.operationState,
        nationalID: currentUser.nationalID,
        driverLicenseClass: currentUser.driverLicenseClass,
        driverLicenseNo: currentUser.driverLicenseNo,
        driverLicenseExpiredDate: currentUser.driverLicenseExpiredDate,
        vehicleRegistrationNo: currentUser.vehicleRegistrationNo,
        vehicleManufacturer: currentUser.vehicleManufacturer,
        vehicleModel: currentUser.vehicleModel,
        vehicleYear: currentUser.vehicleYear,
        vehicleColor: currentUser.vehicleColor,
        bankCode: currentUser.bankCode,
        bankName: currentUser.bankName,
        bankAccountName: currentUser.bankAccountName,
        bankAccountNumber: currentUser.bankAccountNumber,
        deviceId: tokenPermission,
      };
      updateUserData(data, apiToken)
        .then(response => {
          console.log('Success');
          dispatch(setUserData({data: data}));
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          displayErrors(error);
        });
    }
    setEditable(!editable);
  };

  const deleteAccountAction = async () => {
    deleteAccount(apiToken)
      .then(async response => {
        try {
          await provider?.disconnect();
        } catch (e) {}
        setDeleteModalVisible(false);
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'LoginStack',
              params: {appStyles: appStyles, appConfig: appConfig},
            },
          ],
        });
      })
      .catch(error => {
        displayErrors(error);
      });
  };
  if (loading) {
    return <TNActivityIndicator appStyles={appStyles} />;
  }
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <Image
          style={styles.image}
          source={appStyles.iconSet.city}
          size={200}
          color="white"
        />
        <View style={styles.boxContainer}>
          <TouchableOpacity
            style={styles.centerContainer}
            onPress={() => (editable === true ? setModalVisible(true) : '')}>
            <Image
              style={styles.profileImage}
              source={profileImg}
              color="white"
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.text}>Name</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter Full Name"
              placeholderTextColor="#ddd"
              editable={false}
              value={fullName}
            />
          </View>
          <View>
            <Text style={styles.text}>Email</Text>
            <TextInput
              style={styles.inputBox}
              editable={editable}
              placeholder="Enter Email"
              placeholderTextColor="#ddd"
              onChangeText={value => setEmail(value)}
              value={email}
              autoCapitalize="none"
            />
          </View>
          <View>
            <Text style={styles.text}>Phone Number</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter Phone Number"
              placeholderTextColor="#ddd"
              editable={false}
              value={'08023456789'}
            />
          </View>
          <View>
            <Text style={styles.text}>Address</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter Address"
              placeholderTextColor="#ddd"
              editable={editable}
              onChangeText={value => setAddress(value)}
              value={address}
            />
          </View>
        </View>
        <View style={styles.bottomBoxContainer}>
          <View>
            <Text style={styles.title}>Vehicle Information</Text>
            <Text style={styles.text}>Plate Number</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter Plate Number"
              placeholderTextColor="#ddd"
              editable={editable}
              onChangeText={value => setNo(value)}
              value={driverNo}
            />
          </View>
          <View>
            <Text style={styles.text}>Manufacturer</Text>
            <RNPickerSelect
              onValueChange={value => setPlate(value)}
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
                inputIOS: styles.inputBox,
                inputAndroid: styles.inputBox,
              }}
              useNativeAndroidPickerStyle={false}
              value={plate}
            />
          </View>
          <View>
            <Text style={styles.text}>Model</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter Model"
              placeholderTextColor="#ddd"
              editable={editable}
              onChangeText={value => setModel(value)}
              value={model}
            />
          </View>
          <View>
            <Text style={styles.text}>Color</Text>
            <RNPickerSelect
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
                inputIOS: styles.inputBox,
                inputAndroid: styles.inputBox,
              }}
              useNativeAndroidPickerStyle={false}
              value={color}
            />
          </View>
          <View>
            <Text style={styles.text}>Verification Validity</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter Verification Validity"
              placeholderTextColor="#ddd"
              editable={false}
              // onChangeText={value => setValid(value)}
              value={valid}
            />
          </View>
        </View>
        {currentUser.driverType === 'INDIVIDUAL' && (
          <TouchableOpacity style={styles.btnLarge} onPress={editAction}>
            <Text style={styles.btnText}>{editable ? 'Save' : 'Edit'}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          activeOpacity={1}
          // onPress={() => {
          //   setDisModalVisible(true);
          // }}
          style={styles.connectedContainer}>
          <View>
            <Image
              style={styles.valoraImage}
              source={appStyles.iconSet.valora}
              size={200}
              color="white"
            />
          </View>
          <View style={styles.addressContainer}>
            <Text style={styles.addressTitle}>Account Address</Text>
            <Text style={styles.accountTitle}>
              {accountNumber === true
                ? ''
                : accountNumber.substring(0, 3) +
                  '...' +
                  accountNumber.substring(30)}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDeleteModalVisible(true);
          }}
          style={styles.btnDelete}>
          <Icon name="trash-outline" size={25} color={'#F4574D'} />
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>
        <Modal
          onSwipeComplete={() => setDeleteModalVisible(false)}
          avoidKeyboard={true}
          style={styles.modalView}
          isVisible={deleteModalVisible}>
          <View style={styles.deleteModalContent}>
            <Text style={styles.lgTitle}>Delete Account?</Text>
            <Text style={styles.subText}>
              After confirming, your account will be deleted from our system and
              all funds in NFTicket will be lost.
            </Text>
            <TouchableOpacity
              style={styles.btnDeleteContainer}
              onPress={deleteAccountAction}>
              <Text style={styles.btnText}>Yes, Delete Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnCancelContainer}
              onPress={() => setDeleteModalVisible(false)}>
              <Text style={styles.cancelText}>No</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          swipeDirection={['down']}
          onSwipeComplete={() => setModalVisible(false)}
          style={styles.modalView}
          isVisible={modalVisible}>
          <View style={styles.Modalcontent}>
            <View style={styles.flexContainer}>
              <Text style={styles.title}>Choose Image from</Text>
            </View>
            <Icon
              name="close-outline"
              size={25}
              color={'black'}
              style={styles.connectCloseIcon}
              onPress={() => setModalVisible(false)}
            />
            <View style={styles.cameraContainer}>
              <TouchableOpacity
                onPress={() => changeAvatar(0)}
                style={styles.cameraBox}>
                <Svgs.Camera style={styles.modalIcon} />
                <Text style={styles.btnModalText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changeAvatar(1)}
                style={styles.cameraBox}>
                <Svgs.Gallery style={styles.modalIcon} />
                <Text style={styles.btnModalText}>Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAwareScrollView>
    </View>
  );
};
const mapStateToProps = ({auth, journey}) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps, {})(ProfileScreen);
