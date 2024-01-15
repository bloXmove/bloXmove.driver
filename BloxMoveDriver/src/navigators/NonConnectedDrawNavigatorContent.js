import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import Modal from 'react-native-modal';
import Profile from '@app/assets/image/icons/profile.svg';
import {History, Help, Logout, Home, Wallet} from '@app/assets/image/icons';
import {useDispatch, useSelector} from 'react-redux';
import deviceStorage from '../screens/utils/AuthDeviceStorage';
import {Button, COLORS, Text} from '@components';
import {Rating} from 'react-native-ratings';
import FastImage from 'react-native-fast-image';
import {logout} from '@app/src/screens/Onboarding/redux';

const NonConnectedDrawNavigatorContent = props => {
  const {menuItems, appConfig} = props;
  const {navigation} = props;

  const [isModalVisible, setIsModalVisible] = useState(false);

  // TODO: remove
  const appStyles = props.appStyles;

  const currentUser = useSelector(state => state.auth.user);
  const [errorImg, setError] = useState(false);
  const dispatch = useDispatch();

  const logoutAction = async () => {
    setIsModalVisible(false);
    await deviceStorage.setAccessToken('');
    await deviceStorage.setExpired('');
    await deviceStorage.setNonverifedShowOnboardingFlow('false');
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'LoginStack',
          params: {appConfig: appConfig},
        },
      ],
    });
  };

  const renderIcon = data => {
    const {title} = data;

    switch (title) {
      case 'Home':
        return <Home style={styles.icon} />;
      case 'Wallet':
        return <Wallet style={styles.icon} />;
      case 'Ride History':
        return <History style={styles.icon} />;
      case 'Support':
        return <Help style={styles.icon} />;
      case 'Connect Wallet':
        return (
          <FastImage
            style={styles.valoraIcon}
            source={require('@app/assets/image/valora.png')}
          />
        );
    }
  };

  const mappingMenuItems = menuItems.map(
    (menuItem, index) =>
      ((currentUser.firstName && menuItem.title !== 'Connect Wallet') ||
        !currentUser.firstName) && (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => {
            menuItem.title === 'Connect Wallet'
              ? navigation.navigate('LoginStack', {
                  appStyles: appStyles,
                  appConfig: appConfig,
                })
              : navigation.navigate(menuItem.navigationPath, {
                  appStyles: appStyles,
                  appConfig: appConfig,
                });
          }}>
          {renderIcon(menuItem)}
          <Text textStyle="body14SemiBold">{menuItem.title}</Text>
        </TouchableOpacity>
      ),
  );

  return (
    <>
      <SafeAreaView
        style={styles.container}
        forceInset={{top: 'always', horizontal: 'never'}}>
        <>
          <View style={styles.header}>
            <Profile style={styles.profileImg} />
            <View style={styles.profile}>
              <Text textStyle="body18Medium" numberOfLines={1}>
                Tunde Lawal
              </Text>
              <Button
                onPress={() =>
                  navigation.navigate('Profile', {
                    appStyles: appStyles,
                  })
                }
                textStyle="body14SemiBold"
                type="link"
                title="View Profile"
              />
            </View>
            <View style={styles.flexContainer}>
              <Rating
                type="custom"
                ratingCount={1}
                imageSize={17}
                readonly={true}
                style={styles.rating}
                startingValue={5}
              />
              <Text textStyle="body14SemiBold">5</Text>
            </View>
          </View>
          <View style={styles.divider} />
        </>
        <View style={styles.contentWrapper}>
          <View>{mappingMenuItems}</View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsModalVisible(true)}>
            <Logout style={styles.icon} />
            <Text textStyle="body14SemiBold">Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Modal
        swipeDirection={['down']}
        onSwipeComplete={() => setIsModalVisible(false)}
        style={styles.modal}
        isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.centered} textStyle="body18Semibold">
            You appear to be logging out
          </Text>
          <Text style={[styles.centered, styles.description]}>
            Are you sure you want to log out? Logging out means you lose any
            locally saved data.
          </Text>
          <Button
            type="primaryWarning"
            title="Yes, Log Out"
            onPress={logoutAction}
          />
          <Button
            containerStyle={[
              styles.buttonMargin,
              {backgroundColor: COLORS.disabled},
            ]}
            textStyle={{color: COLORS.black}}
            title="Cancel"
            onPress={() => setIsModalVisible(false)}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    paddingVertical: 32,
    paddingLeft: 20,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
  },
  valoraIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
    borderRadius: 2,
  },
  divider: {
    height: 8,
    backgroundColor: COLORS.form,
  },
  contentWrapper: {
    padding: 32,
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  profileImg: {
    marginRight: 16,
    width: 56,
    height: 56,
    borderRadius: 80,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',

    marginVertical: 8,
    paddingVertical: 8,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 32,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
  },
  centered: {
    textAlign: 'center',
    marginBottom: 24,
  },
  description: {
    color: COLORS.body,
  },
  buttonMargin: {
    marginTop: 8,
  },
  profile: {
    flexShrink: 1,
  },
  rating: {
    marginHorizontal: 5,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default NonConnectedDrawNavigatorContent;
