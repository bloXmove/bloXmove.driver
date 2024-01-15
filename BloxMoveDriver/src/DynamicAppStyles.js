const lightColorSet = {
  mainThemeBackgroundColor: '#ffffff',
  mainThemeForegroundColor: '#788eec',
  blackColor: '#191A1C',
  mainColor: '#00C47F',
};

const darkColorSet = {
  mainThemeBackgroundColor: '#ffffff',
  mainThemeForegroundColor: '#788eec',
  blackColor: '#191A1C',
  mainColor: '#00C47F',
};

const colorSet = {
  ...lightColorSet,
  light: lightColorSet,
  dark: darkColorSet,
  'no-preference': lightColorSet,
};

const StyleDict = {
  colorSet,
};

export default StyleDict;
