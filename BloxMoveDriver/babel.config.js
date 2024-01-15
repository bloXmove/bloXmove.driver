module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      'react-native-reanimated/plugin',
      ['@babel/plugin-transform-flow-strip-types', {loose: true}], //https://github.com/facebook/react-native/issues/29084#issuecomment-1030732709
      ['@babel/plugin-proposal-class-properties', {loose: true}],
      [
        'babel-plugin-rewrite-require',
        {
          aliases: {
            stream: 'readable-stream',
          },
        },
      ],
      [
        'module-resolver',
        {
          alias: {
            '@components': './src/components/index',
            '@app': './',
          },
        },
      ],
      ['@babel/plugin-proposal-private-methods', {loose: true}],
    ],
  };
};
