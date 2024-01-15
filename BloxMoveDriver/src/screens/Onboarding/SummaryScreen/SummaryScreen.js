import React, {useRef, useState, useEffect} from 'react';
import {Alert, View, TouchableOpacity, SafeAreaView} from 'react-native';
import {Button, Text, COLORS} from '@components';
import dynamicStyles from './styles';
import svgs from '../../../../assets/svg/svgs';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import Profile from '@app/assets/image/icons/profile.svg';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import Moment from 'moment';
import {getCheckSumAddress} from '@app/src/screens/HomeScreens/utils/api/nft';
import messaging from '@react-native-firebase/messaging';
import {uploadFile} from '@app/src/screens/HomeScreens/utils/api/users';
import {displayErrors} from '../../../helpers/displayErrors';
import {
  checkCameraPermission,
  openSetting,
} from '../../../helpers/getPermission';
import authDeviceStorage from '@app/src/screens/utils/AuthDeviceStorage';
import {createAccount, updateUnverifiedAccount} from '../../utils/api/actions';
import {getUniqueId} from 'react-native-device-info';

const SummaryScreen = props => {
  const {navigation, route} = props;
  const data = route.params.data;
  const userType = route.params.userType;
  const accountId = route.params.accountId;
  const styles = dynamicStyles();
  const imgRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [profileImg, setImg] = useState('');
  const [imageData, setImgData] = useState('');
  const [errorImg, setError] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const uploadImage = avatar => {
    uploadFile(avatar)
      .then(response => {
        if (response.success === true) {
          console.log(response.data);
          return 'success';
        }
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        return 'fail';
      });
  };
  const confirmAction = async () => {
    setLoading(true);
    const tokenPermission = await requestUserPermission();
    if (tokenPermission === 'fail') {
      setLoading(false);
      openSetting(
        'Please allow notification permission to get the push notification',
      );
      return;
    }
    const verification_uid = await getUniqueId();
    data.driverType = userType === '0' ? 'COMPANY' : 'INDIVIDUAL';
    data.companyCode = 'string';
    data.walletAddress = accountId;
    data.deviceId = tokenPermission;
    data.vehicleYear = parseInt(data.vehicleYear, 10);
    data.birthday = Moment(data.birthday).format('YYYY-MM-DD');
    data.driverLicenseExpiredDate = Moment(
      data.driverLicenseExpiredDate,
    ).format('YYYY-MM-DD');
    data.vehicleType = 'CAR';
    data.verification_uid = verification_uid;
    const unverified = await authDeviceStorage.getUUID();
    // Used to update non verified account
    if (
      unverified !== '' &&
      unverified.walletAddress === accountId &&
      unverified.uuid !== ''
    ) {
      data.uuid = unverified.uuid;
      setLoading(true);
      updateUnverified(data);
      return;
    }
    createAccount(data)
      .then(async response => {
        data.uuid = response.data.data.uuid;
        if (response.data.data) {
          await authDeviceStorage.setUUID(data);
        }
        if (imageData.file) {
          await uploadImage(imageData);
        }
        await authDeviceStorage.setVerificationShowFlow('true');
        await authDeviceStorage.setAccount(data);
        await authDeviceStorage.setAccountNumber(accountId);
        navigation.navigate('Confirm', {
          data: data,
          accountId: accountId,
        });
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        displayErrors(error);
      });
  };

  const updateUnverified = userData => {
    updateUnverifiedAccount(userData)
      .then(async response => {
        if (imageData.file) {
          uploadImage(imageData);
        }
        await authDeviceStorage.setVerificationShowFlow('true');
        await authDeviceStorage.setAccount(data);
        await authDeviceStorage.setAccountNumber(accountId);
        navigation.navigate('Confirm', {
          data: data,
          accountId: accountId,
        });
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        displayErrors(error);
      });
  };

  const editAction = () => {
    navigation.goBack();
  };

  const runIfCameraPermissionGranted = async callback => {
    const permissions = await checkCameraPermission();
    if (permissions !== 'granted') {
      openSetting(
        'You must enable camera permissions in order to take photos.',
        'Camera permission denied',
      );
      return;
    }
    setModalVisible(true);
  };
  const changeAvatar = type => {
    if (type === 0) {
      onLaunchCamera();
    } else {
      onOpenPhotos();
    }
  };
  const startUpload = async source => {
    const newAddress = await getCheckSumAddress(accountId);
    var walletAddress = '';
    if (newAddress.success === true) {
      walletAddress = newAddress.address;
    } else {
      walletAddress = accountId;
    }
    // setLoading(true);
    const avatarData = {
      type: 'AVATAR',
      walletAddress: walletAddress,
      file: {
        uri: source.path,
        type: source.mime,
        name: Date.now() + source.path.split('/').pop(),
      },
    };
    setImgData(avatarData);
    setImg(source.path);
  };
  const onLaunchCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
      width: 400,
      height: 400,
    }).then(image => {
      setModalVisible(false);
      startUpload(image);
    });
  };

  const onOpenPhotos = () => {
    ImagePicker.openPicker({
      cropping: true,
      width: 400,
      height: 400,
    }).then(image => {
      setModalVisible(false);
      startUpload(image);
    });
  };

  const deleteAction = () => {
    setImgData('');
    setImg('');
  };

  return (
    <SafeAreaView style={styles.safeview}>
      <KeyboardAwareScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => editAction()}>
              <svgs.Back />
            </TouchableOpacity>
            <Text textStyle="body18Medium" style={styles.headerTitle}>
              Summary
            </Text>
          </View>
          <Text style={styles.description} textStyle="body14Regular">
            Confirm the details provided
          </Text>
          <Text style={styles.subTitle} textStyle="body18Medium">
            Personal Information
          </Text>
          <View style={styles.inputContainer}>
            <View
              // disabled={isLoading}
              style={styles.avatarContainer}>
              <TouchableOpacity onPress={() => runIfCameraPermissionGranted()}>
                {profileImg !== '' ? (
                  <FastImage
                    style={styles.profileImage}
                    ref={imgRef}
                    source={{
                      uri: profileImg,
                      cache: FastImage.cacheControl.immutable,
                      priority: FastImage.priority.high,
                    }}
                    defaultSource={require('@app/assets/image/icons/profile.svg')}
                    onError={() => setError(true)}
                    collapsable={false}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                ) : (
                  <Profile height={80} width={80} />
                )}
              </TouchableOpacity>
              {profileImg !== '' && (
                <TouchableOpacity
                  style={styles.deleteAvatar}
                  onPress={() => deleteAction()}>
                  <svgs.Delete size={20} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14SemiBold">First name:</Text>
            <Text textStyle="body14Regular" style={styles.desText}>
              {data.firstName}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14SemiBold">Last name:</Text>
            <Text textStyle="body14Regular" style={styles.desText}>
              {data.lastName}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14SemiBold">Email:</Text>
            <Text textStyle="body14Regular" style={styles.desText}>
              {data.email}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14SemiBold">Phone:</Text>
            <Text textStyle="body14Regular" style={styles.desText}>
              {data.phoneNumber}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14SemiBold">Date of birth:</Text>
            <Text textStyle="body14Regular" style={styles.desText}>
              {data.birthday}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14SemiBold">Address:</Text>
            <Text textStyle="body14Regular" style={styles.desText}>
              {data.address}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14SemiBold">State:</Text>
            <Text textStyle="body14Regular" style={styles.desText}>
              {data.state}
            </Text>
          </View>
          <Text style={styles.subTitle} textStyle="body18Medium">
            License Information
          </Text>
          <View style={styles.inputContainer}>
            <Text textStyle="body14SemiBold">ID Number:</Text>
            <Text textStyle="body14Regular" style={styles.desText}>
              {data.driverLicenseNo}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14SemiBold">Expiring Date:</Text>
            <Text textStyle="body14Regular" style={styles.desText}>
              {data.driverLicenseExpiredDate}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14SemiBold">Driver Class:</Text>
            <Text textStyle="body14Regular" style={styles.desText}>
              {data.driverLicenseClass}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14SemiBold">NIN Number:</Text>
            <Text textStyle="body14Regular" style={styles.desText}>
              {data.nationalID}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14SemiBold">Operating State:</Text>
            <Text textStyle="body14Regular" style={styles.desText}>
              {data.operationState}
            </Text>
          </View>
          <Text style={styles.subTitle} textStyle="body18Medium">
            Vehicle Information
          </Text>
          <View style={styles.inputContainer}>
            <Text textStyle="body14SemiBold">Registration number:</Text>
            <Text textStyle="body14Regular" style={styles.desText}>
              {data.vehicleRegistrationNo}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14SemiBold">Manufacturer:</Text>
            <Text textStyle="body14Regular" style={styles.desText}>
              {data.vehicleManufacturer}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14SemiBold">Model:</Text>
            <Text textStyle="body14Regular" style={styles.desText}>
              {data.vehicleModel}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14SemiBold">Year:</Text>
            <Text textStyle="body14Regular" style={styles.desText}>
              {data.vehicleYear}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14SemiBold">Color:</Text>
            <Text textStyle="body14Regular" style={styles.desText}>
              {data.vehicleColor}
            </Text>
          </View>
          <Text style={styles.subTitle} textStyle="body18Medium">
            Payment Information
          </Text>
          <View style={styles.inputContainer}>
            <Text textStyle="body14SemiBold">Bank Name:</Text>
            <Text textStyle="body14Regular" style={styles.desText}>
              {data.bankAccountName}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14SemiBold">Account Number: </Text>
            <Text textStyle="body14Regular" style={styles.desText}>
              {data.bankAccountNumber}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14SemiBold">Account Name :</Text>
            <Text textStyle="body14Regular" style={styles.desText}>
              {data.vehicleModel}
            </Text>
          </View>
          <View style={styles.flexContainer}>
            <Button
              containerStyle={styles.button}
              type="grey"
              onPress={editAction}
              disabled={loading}
              title="Edit"
            />
            <Button
              containerStyle={
                loading ? styles.buttonLoadingMain : styles.button
              }
              type="primary"
              onPress={confirmAction}
              disabled={loading}
              title="Save"
            />
          </View>
        </View>
        <Modal
          swipeDirection={['down']}
          onSwipeComplete={() => setModalVisible(false)}
          style={styles.imagePickerModal}
          isVisible={modalVisible}>
          <View style={styles.imagePickerContent}>
            <View style={styles.imagePickerHeader}>
              <Text textStyle="body18Semibold">Choose Image from</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon
                  name="close"
                  size={25}
                  color={'black'}
                  style={styles.connectCloseIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.imagePickerButtonContainer}>
              <TouchableOpacity
                onPress={() => changeAvatar(0)}
                style={styles.imagePickerButton}>
                <Icon name="camerao" size={30} color={COLORS.black} />
                <Text>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changeAvatar(1)}
                style={styles.imagePickerButton}>
                <Icon name="jpgfile1" size={30} color={COLORS.black} />
                <Text>Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default SummaryScreen;
