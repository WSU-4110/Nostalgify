module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['@babel/preset-env', 'babel-preset-expo'],
    plugins: [
      ["module:react-native-dotenv"]
    ],
    babelrcRoots: ['./', './node_modules/'],
    sourceType: 'unambiguous',
  };
};