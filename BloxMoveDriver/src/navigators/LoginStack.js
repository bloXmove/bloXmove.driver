import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DynamicAppStyles from '../AppStyles';
import SocialNetworkConfig from '../WalkthroughAppConfig';
import {COLORS} from '@components';

import {
  SetupProfileScreen,
  WelcomeScreen,
  ConfirmVerification,
  ProcessingVerification,
  GrantScreen,
  QRScreen,
  OTPScreen,
  GetStartScreen,
  PersonalScreen,
  IndentificationScreen,
  VehicleInformationScreen,
  PaymentInformationScreen,
  SummaryScreen,
  VerificationMethod,
  ProcessingScreen,
  NotVerifiedScreen,
  RecoveryScreen,
} from '../screens/Onboarding';
import ErrorScreen from '@app/src/screens/HomeScreens/ErrorScreen/ErrorScreen';
// import {COLORS} from '@components';

const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        // headerTitle: () => {
        //   return <Svgs.Logo width="50" height="50" />;
        // },
        // headerTitleStyle: {
        //   alignSelf: 'center',
        //   textAlign: 'center',
        // },
        // headerTitleAlign: 'center',
        cardStyle: {backgroundColor: COLORS.white},
        headerShown: false,
      }}>
      <Stack.Screen
        name="Welcome"
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: SocialNetworkConfig,
        }}
        component={WelcomeScreen}
      />
      <Stack.Screen name="Grant" component={GrantScreen} />
      <Stack.Screen name="GetStart" component={GetStartScreen} />
      <Stack.Screen name="Recovery" component={RecoveryScreen} />
      <Stack.Screen name="Personal" component={PersonalScreen} />
      <Stack.Screen name="Identify" component={IndentificationScreen} />
      <Stack.Screen name="Vehicle" component={VehicleInformationScreen} />
      <Stack.Screen name="Payment" component={PaymentInformationScreen} />
      <Stack.Screen name="Summary" component={SummaryScreen} />
      <Stack.Screen name="SetupProfile" component={SetupProfileScreen} />
      <Stack.Screen name="Confirm" component={ConfirmVerification} />
      <Stack.Screen name="Processing" component={ProcessingVerification} />
      <Stack.Screen name="ProcessingScreen" component={ProcessingScreen} />
      <Stack.Screen name="NotVerified" component={NotVerifiedScreen} />
      <Stack.Screen name="Verification" component={VerificationMethod} />
      <Stack.Screen name="ErrorScreen" component={ErrorScreen} />
      <Stack.Screen
        name="QRScreen"
        component={QRScreen}
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: SocialNetworkConfig,
        }}
      />
      <Stack.Screen
        name="OTP"
        component={OTPScreen}
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: SocialNetworkConfig,
        }}
      />
    </Stack.Navigator>
  );
};

export default LoginStack;
