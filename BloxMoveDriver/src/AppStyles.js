const lightColorSet = {
  mainThemeBackgroundColor: '#ffffff',
  bgColor: '#ffffff',
  textColor: '#000000',
  mainThemeForegroundColor: '#1E3947',
  blackColor: '#191A1C',
  mainColor: '#4C986C',
  mainTextColor: '#151723',
  grey0: '#f2f2f2',
  grey3: '#e6e6f2',
  grey6: '#d6d6d6',
  grey9: '#939393',
  borderColor: '#EFEFF4',
};

const darkColorSet = {
  mainThemeBackgroundColor: '#ffffff',
  bgColor: '#000000',
  textColor: '#ffffff',
  mainThemeForegroundColor: '#1E3947',
  blackColor: '#191A1C',
  mainColor: '#4C986C',
  mainTextColor: '#151723',
  grey0: '#f2f2f2',
  grey3: '#e6e6f2',
  grey6: '#d6d6d6',
  grey9: '#939393',
  borderColor: '#EFEFF4',
};

const colorSet = {
  ...lightColorSet,
  light: lightColorSet,
  dark: darkColorSet,
  'no-preference': lightColorSet,
};

const iconSet = {
  city: require('../assets/image/City.png'),
  cello: require('../assets/image/cello.png'),
  carIcon: require('../assets/image/CarIcon.png'),
  taxiIcon: require('../assets/image/taxi.png'),
  directionsIcon: require('../assets/image/Directions.png'),
  busIcon: require('../assets/image/bus.png'),
  tukIcon: require('../assets/image/tuk-tuk.png'),
  homeIcon: require('../assets/image/home.png'),
  profileIcon: require('../assets/image/profile-unfilled.png'),
  IDIcon: require('../assets/image/ID.png'),
  settingIcon: require('../assets/image/settings-menu-item.png'),
  walletIcon: require('../assets/image/wallet.png'),
  valora: require('../assets/image/valora.png'),
  valora_1: require('../assets/image/valora-1.png'),
  avatarBlank: require('../assets/image/Avatar.png'),
};

const navLight = {
  backgroundColor: '#fff',
  fontColor: '#000',
  activeTintColor: '#3875e8',
  inactiveTintColor: '#ccc',
  hairlineColor: '#e0e0e0',
};

const navDark = {
  backgroundColor: '#000',
  fontColor: '#fff',
  activeTintColor: '#3875e8',
  inactiveTintColor: '#888',
  hairlineColor: '#222222',
};

const navThemeConstants = {
  light: navLight,
  dark: navLight,
  main: '#3875e8',
  'no-preference': navLight,
};

const StyleDict = {
  colorSet,
  iconSet,
  navThemeConstants,
};

export default StyleDict;
