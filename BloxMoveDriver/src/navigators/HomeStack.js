import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DynamicAppStyles from '../AppStyles';
import SocialNetworkConfig from '../WalkthroughAppConfig';
import Svgs from '../../assets/svg/svgs';
import MainDrawer from './MainDrawer';

import {
  ContactScreen,
  DetailHelpScreen,
  HomeScreen,
  TransactionScreen,
  NewRequestScreen,
  CompletedRequestScreen,
  DetailTransactionScreen,
  CancelRideScreen,
  WithdrawScreen,
  ChangeBankScreen,
  OperationState,
  CompletedScreen,
  ErrorScreen,
} from '../screens/HomeScreens';
import {ProcessingScreen} from '../screens/Onboarding';

import {SetupProfileScreen, ConfirmVerification} from '../screens/Onboarding';
import AboutScreen from '../screens/HomeScreens/HelpScreen/AboutScreen';
import ManageNotification from '@app/src/helpers/manageNotification';

const Stack = createStackNavigator();
const HomeStack = () => {
  ManageNotification();
  return (
    <Stack.Navigator
      initialRouteName="NavStack"
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
        headerStyle: {},
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      })}>
      <Stack.Screen
        name="NavStack"
        options={{headerShown: false}}
        component={MainDrawer}
      />
      <Stack.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: SocialNetworkConfig,
        }}
        name="Home"
        options={() => ({header: () => null})}
        component={HomeScreen}
      />
      <Stack.Screen
        name="Transaction"
        component={TransactionScreen}
        options={() => ({header: () => null})}
      />
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={() => ({header: () => null})}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={() => ({header: () => null})}
      />
      <Stack.Screen
        name="DetailHelp"
        component={DetailHelpScreen}
        options={() => ({header: () => null})}
      />
      <Stack.Screen
        name="ErrorScreen"
        component={ErrorScreen}
        options={() => ({header: () => null})}
      />
      <Stack.Screen name="SetupProfile" component={SetupProfileScreen} />
      <Stack.Screen name="Confirm" component={ConfirmVerification} />
      <Stack.Screen
        name="DetailTransaction"
        component={DetailTransactionScreen}
      />
      <Stack.Screen
        name="Completed"
        component={CompletedScreen}
        options={() => ({header: () => null, gestureEnabled: false})}
      />
      <Stack.Screen
        name="CompletedRequest"
        component={CompletedRequestScreen}
      />
      <Stack.Screen
        name="Request"
        options={() => ({header: () => null})}
        component={NewRequestScreen}
      />
      {/* <Stack.Screen name="CardPayment" component={CardPaymentScreen} /> */}
      <Stack.Screen
        name="CardPayment"
        component={WithdrawScreen}
        options={() => ({header: () => null})}
      />
      <Stack.Screen
        name="ChangeBank"
        component={ChangeBankScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="OperationState"
        component={OperationState}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="CancelRide"
        component={CancelRideScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ProcessingScreen"
        options={{header: () => null}}
        component={ProcessingScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
