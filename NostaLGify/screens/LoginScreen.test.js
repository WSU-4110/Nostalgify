import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from './LoginScreen';
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
const mockedDispatch = jest.fn();
jest.mock('expo-linking');

// Mocks like this need to be configured at the top level 
// of the test file, they can't be setup inside your tests.
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: mockedDispatch,
    }),
  };
});

describe('LoginScreen component', () => {
    it('renders without crashing', () => {
        render(<LoginScreen />);
    });

});
