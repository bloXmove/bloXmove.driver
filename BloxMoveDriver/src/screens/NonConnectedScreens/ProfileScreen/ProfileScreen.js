import React, {useState} from 'react';
import {View, TouchableOpacity, SafeAreaView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import {useSelector, connect} from 'react-redux';
import {getUser, updateUserToken, deleteAccount} from '../utils/api/users';
import {displayErrors} from '../../../helpers';
import {TNActivityIndicator, Text, Button, COLORS} from '@components';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import Profile from '@app/assets/image/icons/profile.svg';
import ProfileEdit from './ProfileEdit';
import dynamicStyles from './styles';
import authDeviceStorage from '@app/src/screens/utils/AuthDeviceStorage';

const ProfileScreen = props => {
  const {navigation} = props;
  const styles = dynamicStyles();

  const connector = useWalletConnect();

  const [isEditVisible, setIsEditVisible] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const deleteAccountAction = async () => {
    try {
      authDeviceStorage.setNonverifedShowOnboardingFlow('false');
      await connector?.killSession();
    } catch (e) {}
    setDeleteModalVisible(false);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'LoginStack',
        },
      ],
    });
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
        </View>
        <View style={styles.profileImageContainer}>
          <Profile />
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
              Tunde
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14Regular" style={styles.inputLabel}>
              Last name
            </Text>
            <Text style={styles.userData} textStyle="body14Regular">
              Lawal
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14Regular" style={styles.inputLabel}>
              Email
            </Text>
            <Text style={styles.userData} textStyle="body14Regular">
              Tunde32@gmail.com
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14Regular" style={styles.inputLabel}>
              Phone number
            </Text>
            <Text style={styles.userData} textStyle="body14Regular">
              +234 701 283 2342
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text textStyle="body14Regular" style={styles.inputLabel}>
              Address
            </Text>
            <Text style={styles.userData} textStyle="body14Regular">
              5, street name, local govt, state.
            </Text>
          </View>
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
            <Text style={styles.centered} textStyle="body18Semibold">
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
