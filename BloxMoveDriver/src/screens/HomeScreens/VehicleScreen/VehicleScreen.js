import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  useColorScheme,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import dynamicStyles from './styles';
import deviceStorage from '../../utils/AuthDeviceStorage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';

const VehicleScreen = props => {
  const {route} = props;
  const appConfig = route.params.appConfig;
  const appStyles = route.params.appStyles;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  // eslint-disable-next-line no-unused-vars
  const [profileImg, setImg] = useState(appStyles.iconSet.taxiIcon);

  let currentTheme = appStyles.navThemeConstants[colorScheme];

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    await deviceStorage.getAccount();
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={styles.btnToggle} onPress={openDrawer}>
          <Icon name="menu-outline" size={30} color={currentTheme.fontColor} />
        </TouchableOpacity>
      ),
    });
  }, []);
  const openDrawer = () => {
    Keyboard.dismiss();
    props.navigation.openDrawer();
  };

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
          <TouchableOpacity style={styles.centerContainer} activeOpacity={1}>
            <Image
              style={styles.profileImage}
              source={profileImg}
              color="white"
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.text}>Year : 2016</Text>
          </View>
          <View>
            <Text style={styles.text}>Model : C-Klass</Text>
          </View>
          <View>
            <Text style={styles.text}>Color : White</Text>
          </View>
          <View>
            <Text style={styles.text}>Number of seats : 4</Text>
          </View>
          <View>
            <Text style={styles.text}>Fuel Type : Petrol</Text>
          </View>
          <View>
            <Text style={styles.text}>Licence Number : APP-456-46</Text>
          </View>
          <TouchableOpacity
            style={styles.btnLarge}
            onPress={() => {
              props.navigation.navigate('SetupProfile', {
                appStyles: appStyles,
                appConfig: appConfig,
              });
            }}>
            <Text style={styles.btnText}>Change</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
VehicleScreen.propTypes = {
  appStyles: PropTypes.object,
  appConfig: PropTypes.object,
};

export default VehicleScreen;
