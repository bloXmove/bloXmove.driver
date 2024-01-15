import AppStyles from './AppStyles';

const WalkthroughAppConfig = {
  onboardingConfig: {
    walkthroughScreens: [
      {
        icon: require('../assets/image/Pay1.png'),
        title: 'Earn easy money with BloXmove',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac vestibulum',
      },
      {
        icon: require('../assets/image/Pay2.png'),
        title: 'Enjoy the fastest payout system',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac vestibulum',
      },
      {
        icon: require('../assets/image/Pay3.png'),
        title: 'Relax while we do all the stress',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac vestibulum',
      },
    ],
  },
  drawerMenu: {
    upperMenu: [
      {
        title: 'Home',
        icon: AppStyles.iconSet.homeIcon,
        navigationPath: 'Home',
      },
      // {
      //   title: 'Vehicle',
      //   icon: AppStyles.iconSet.IDIcon,
      //   navigationPath: 'Vehicle',
      // },
      {
        title: 'Wallet',
        icon: AppStyles.iconSet.walletIcon,
        navigationPath: 'Wallet',
      },
      {
        title: 'Ride History',
        icon: AppStyles.iconSet.carIcon,
        navigationPath: 'MyRides',
      },
      {
        title: 'Support',
        icon: AppStyles.iconSet.settingIcon,
        navigationPath: 'Help',
      },
    ],
    lowerMenu: [
      {
        title: 'Logout',
        action: 'logout',
      },
    ],
  },
};

export default WalkthroughAppConfig;
