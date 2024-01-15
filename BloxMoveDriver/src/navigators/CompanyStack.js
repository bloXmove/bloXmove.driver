import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DynamicAppStyles from '../AppStyles';
import SocialNetworkConfig from '../WalkthroughAppConfig';
import Svgs from '../../assets/svg/svgs';

import HomeCompanyScreen from '../screens/HomeScreens/CompanyScreen/HomeCompanyScreen';

const Stack = createStackNavigator();

const CompanyStack = () => (
  <Stack.Navigator
    initialRouteName="HomeCompany"
    screenOptions={{
      headerTitle: () => {
        return <Svgs.Logo width="50" height="50" />;
      },
      headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
      },
      headerTitleAlign: 'center',
    }}>
    <Stack.Screen
      name="HomeCompany"
      initialParams={{
        appStyles: DynamicAppStyles,
        appConfig: SocialNetworkConfig,
      }}
      component={HomeCompanyScreen}
    />
  </Stack.Navigator>
);

export default CompanyStack;
