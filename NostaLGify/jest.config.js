module.exports = {
    preset: 'react-native',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    setupFiles: ['./node_modules/react-native/jest/setup.js'], // Add this line if you haven't already
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation|@expo|react-navigation)',
    ],
  };
  