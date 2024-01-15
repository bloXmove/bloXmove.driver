import React from 'react';
import DrawNavigatorContent from './DrawNavigatorContent';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import DynamicAppStyles from '../AppStyles';
import SocialNetworkConfig from '../WalkthroughAppConfig';
import Svgs from '../../assets/svg/svgs';

import {
  HelpScreen,
  HomeScreen,
  ProfileScreen,
  WalletScreen,
  MyRidesScreen,
  ApprovedScreen,
  ContactScreen,
  ErrorScreen,
} from '../screens/NonConnectedScreens';
import VehicleScreen from '../screens/HomeScreens/VehicleScreen/VehicleScreen';
import ManageNotification from '@app/src/helpers/manageNotification';
import NonConnectedDrawNavigatorContent from './NonConnectedDrawNavigatorContent';

const Drawer = createDrawerNavigator();

const NonConnectedDrawer = () => {
  ManageNotification();
  return (
    <Drawer.Navigator
      drawerContent={({navigation}) => (
        <NonConnectedDrawNavigatorContent
          navigation={navigation}
          appStyles={DynamicAppStyles}
          menuItems={SocialNetworkConfig.drawerMenu.upperMenu}
          appConfig={SocialNetworkConfig}
        />
      )}
      screenOptions={({navigation}) => ({
        headerTitle: () => {
          return <Svgs.Logo width="50" height="50" />;
        },
        headerRight: () => (
          <TouchableOpacity
            style={{marginRight: 20}}
            onPress={() =>
              navigation.navigate('DetailHelp', {
                appStyles: DynamicAppStyles,
                appConfig: SocialNetworkConfig,
              })
            }>
            <Icon name="help-circle-outline" size={30} color={'black'} />
          </TouchableOpacity>
        ),
        headerTitleStyle: {
          alignSelf: 'center',
          textAlign: 'center',
        },
        headerTitleAlign: 'center',
      })}>
      <Drawer.Screen
        name="Home"
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: SocialNetworkConfig,
        }}
        component={HomeScreen}
        options={() => ({header: () => null})}
      />
      <Drawer.Screen
        name="BookHail"
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: SocialNetworkConfig,
        }}
        component={ApprovedScreen}
        options={{header: () => null}}
      />
      <Drawer.Screen
        name="ErrorScreen"
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: SocialNetworkConfig,
        }}
        component={ErrorScreen}
        options={{header: () => null}}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={() => ({header: () => null})}
      />
      <Drawer.Screen name="Vehicle" component={VehicleScreen} />
      <Drawer.Screen
        name="Wallet"
        component={WalletScreen}
        options={() => ({header: () => null})}
      />
      <Drawer.Screen
        name="MyRides"
        component={MyRidesScreen}
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: SocialNetworkConfig,
        }}
        options={() => ({header: () => null})}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={() => ({header: () => null})}
      />
      <Drawer.Screen
        name="Approved"
        component={ApprovedScreen}
        options={() => ({header: () => null})}
      />
    </Drawer.Navigator>
  );
};

export default NonConnectedDrawer;
