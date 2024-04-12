module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation)',
    ],
    globals: {
      __DEV__: true,
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    preset: 'react-native',
    // setupFiles: ['<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js'],
    // setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  };
  