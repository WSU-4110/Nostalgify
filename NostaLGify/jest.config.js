module.exports = {
    setupFiles: ['<rootDir>/jest.setup.js'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
      '^.+\\.mjs$': 'babel-jest'
    },
    transformIgnorePatterns: [
      'node_modules/(?!(react-native|@react-native-async-storage/async-storage)/)'
    ]
  };
  