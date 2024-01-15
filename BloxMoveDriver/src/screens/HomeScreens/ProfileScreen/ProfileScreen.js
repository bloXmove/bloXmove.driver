import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Vibration,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import {useSelector, connect} from 'react-redux';
import {getUser, updateUserToken, deleteAccount} from '../utils/api/users';
import {displayErrors} from '../../../helpers';
import {TNActivityIndicator, Text, Button, COLORS} from '@components';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';
import Profile from '@app/assets/image/icons/profile.svg';
import ProfileEdit from './ProfileEdit';
import dynamicStyles from './styles';
import FastImage from 'react-native-fast-image';
import authDeviceStorage from '@app/src/screens/utils/AuthDeviceStorage';
import {getPhrase} from '@app/src/lib/LocalWallet';
import Clipboard from '@react-native-clipboard/clipboard';

const ProfileScreen = props => {
  const {navigation} = props;
  const apiToken = useSelector(state => state.auth.token);
  const styles = dynamicStyles();

  const {provider} = useWalletConnectModal();

  const userData = useSelector(state => state.auth.user);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const accountId = useSelector(state => state.auth.user.walletAddress);

  const [isLoading, setLoading] = useState(false);
  const [loading, setBtnLoading] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [phraseModalVisible, setPhraseModalVisible] = useState(false);
  const [phrase, setPhrase] = useState('');

  const deleteAccountAction = async () => {
    setLoading(true);
    deleteAccount(apiToken)
      .then(async response => {
        try {
          await provider?.disconnect();
        } catch (e) {}
        await authDeviceStorage.setAccessToken('');
        await authDeviceStorage.setExpired('');
        await authDeviceStorage.setShouldShowOnboardingFlow('false');
        setDeleteModalVisible(false);
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'LoginStack',
            },
          ],
        });
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        displayErrors(error);
      });
  };
  const showRecovery = async () => {
    setBtnLoading(true);

    const userPhrase = await getPhrase();

    console.log(userPhrase);

    if (userPhrase) {
      setPhrase(userPhrase);
      setBtnLoading(false);
      setPhraseModalVisible(true);
      return;
    }
    setBtnLoading(false);
  };
  const vibratePhone = () => {
    try {
      Vibration.vibrate(Platform.OS === 'android' ? 100 : [100]);
    } catch {}
  };
  if (isLoading) {
    return <TNActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <View style={[styles.header, styles.row]}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Icon name="arrowleft" size={24} color={COLORS.black} />
            </TouchableOpacity>
            <Text textStyle="body18Semibold">Profile</Text>
          </View>
          {userData.driverType && userData.driverType !== 'COMPANY' && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditVisible(true)}>
              <Icon name="edit" size={24} color={COLORS.black} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.profileImageContainer}>
          {userData.avatar === '' ? (
            <Profile />
          ) : (
            <FastImage
              style={styles.profileImage}
              source={{
                uri: userData.avatar,
                cache: FastImage.cacheControl.web,
                priority: FastImage.priority.normal,
              }}
              collapsable={false}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
          {userData.referralCode && userData.referralCode !== '' && (
            <Text textStyle="body18Semibold" style={styles.referralBy}>
              Referral code - {userData?.referralCode}
            </Text>
          )}
        </View>
        <View style={styles.divider} />
        <View style={styles.content}>
          <Text style={styles.sectionTitle} textStyle="body18Semibold">
            Personal Information
          </Text>
          <View style={styles.inputContainer}>
            <Text textStyle="body14Regular" style={styles.inputLabel}>
              First name:
            </Text>
            <Text style={styles.userData} textStyle="body14Regular">
              {userData?.firstName ?? ''}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14Regular" style={styles.inputLabel}>
              Last name
            </Text>
            <Text style={styles.userData} textStyle="body14Regular">
              {userData?.lastName ?? ''}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14Regular" style={styles.inputLabel}>
              Email
            </Text>
            <Text style={styles.userData} textStyle="body14Regular">
              {userData?.email ?? ''}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14Regular" style={styles.inputLabel}>
              Phone number
            </Text>
            <Text style={styles.userData} textStyle="body14Regular">
              {userData?.phoneNumber ?? ''}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14Regular" style={styles.inputLabel}>
              Address
            </Text>
            <Text style={styles.userData} textStyle="body14Regular">
              {userData?.address ?? ''}
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.content}>
          <Text style={styles.sectionTitle} textStyle="body18Semibold">
            Vehicle Information
          </Text>
          <View style={styles.inputContainer}>
            <Text textStyle="body14Regular" style={styles.inputLabel}>
              Plate Number
            </Text>
            <Text style={styles.userData} textStyle="body14Regular">
              {userData?.vehicleRegistrationNo ?? ''}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14Regular" style={styles.inputLabel}>
              Manufacturer
            </Text>
            <Text style={styles.userData} textStyle="body14Regular">
              {userData?.vehicleManufacturer ?? ''}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14Regular" style={styles.inputLabel}>
              Model
            </Text>
            <Text style={styles.userData} textStyle="body14Regular">
              {userData?.vehicleModel ?? ''}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14Regular" style={styles.inputLabel}>
              Year
            </Text>
            <Text style={styles.userData} textStyle="body14Regular">
              {userData?.vehicleYear ?? ''}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14Regular" style={styles.inputLabel}>
              Color
            </Text>
            <Text style={styles.userData} textStyle="body14Regular">
              {userData?.vehicleColor ?? ''}
            </Text>
          </View>
          {userData.driverType === 'INDIVIDUAL' && (
            <View style={styles.inputContainer}>
              <Text textStyle="body14Regular" style={styles.inputLabel}>
                Certificate Validity
              </Text>
              <Text style={styles.userData} textStyle="body14Regular">
                {userData && userData.certificateExpireDate
                  ? new Date(userData.certificateExpireDate).toDateString()
                  : ''}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.divider} />
        <View style={styles.content}>
          <Text style={styles.sectionTitle} textStyle="body14SemiBold">
            Wallet information
          </Text>
          <TouchableOpacity
            onPress={() => {
              try {
                Clipboard.setString(accountId);
                vibratePhone();
              } catch (e) {
                console.log(e);
              }
            }}>
            <Text style={styles.addressData} textStyle="body14Regular">
              {accountId &&
                accountId.substring(0, 8) + '...' + accountId.substring(30)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flexContainer}
            onPress={() => showRecovery()}>
            <Text style={styles.userData} textStyle="body14Regular">
              Recovery Phrase
            </Text>
            <Icon name="right" size={20} color={COLORS.black} />
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />

        <TouchableOpacity
          onPress={() => {
            setDeleteModalVisible(true);
          }}
          style={styles.button}>
          <Icon
            style={styles.backButton}
            name="delete"
            size={25}
            color={'#F4574D'}
          />
          <Text style={{color: COLORS.error}} textStyle="body18Regular">
            Delete Account
          </Text>
        </TouchableOpacity>
        <Modal
          onSwipeComplete={() => setDeleteModalVisible(false)}
          avoidKeyboard={true}
          style={styles.modal}
          isVisible={deleteModalVisible}>
          <View style={styles.modalContent}>
            <Text
              style={styles.centered}
              disabled={isLoading}
              textStyle="body18Semibold">
              Delete Account?
            </Text>
            <Text
              textStyle="body14Regular"
              style={[styles.description, styles.centered]}>
              After confirming, your account will be deleted from our system and
              all funds will be lost.
            </Text>
            <Button
              type="primaryWarning"
              title="Yes, Delete Account"
              onPress={deleteAccountAction}
              containerStyle={styles.buttonMargin}
            />
            <Button
              type="outlined"
              containerStyle={{backgroundColor: COLORS.disabled}}
              textStyle={{color: COLORS.black}}
              title="No"
              onPress={() => setDeleteModalVisible(false)}
            />
          </View>
        </Modal>
        <Modal
          onSwipeComplete={() => setPhraseModalVisible(false)}
          avoidKeyboard={true}
          style={styles.modal}
          isVisible={phraseModalVisible}>
          <View style={styles.modalContent}>
            <Text style={styles.centered} textStyle="body18Semibold">
              Recovery Phrase
            </Text>
            <TouchableOpacity
              onPress={() => {
                try {
                  Clipboard.setString(phrase);
                  vibratePhone();
                } catch (e) {
                  console.log(e);
                }
              }}>
              <Text textStyle="body18Regular" style={styles.recoveryContainer}>
                {phrase}
              </Text>
            </TouchableOpacity>
            <Button
              type="outlined"
              containerStyle={{backgroundColor: COLORS.form}}
              textStyle={{color: COLORS.black}}
              title="Close"
              disabled={loading}
              onPress={() => setPhraseModalVisible(false)}
            />
          </View>
        </Modal>
        {isEditVisible && (
          <ProfileEdit
            isEditVisible={isEditVisible}
            setIsEditVisible={setIsEditVisible}
            navigation={navigation}
          />
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = ({auth}) => {
  return {
    user: auth.user,
    token: auth.token,
    loading: auth.loading,
  };
};

export default connect(mapStateToProps, {
  getUser,
  updateUserToken,
})(ProfileScreen);
