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
  
    it('displays the app name correctly', () => {
      const { getByText } = render(<LoginScreen />);
      expect(getByText('Nostalgify')).toBeTruthy();
    });
  
    it('contains a "Sign In with Spotify" button', () => {
      const { getByText } = render(<LoginScreen />);
      expect(getByText('Sign In with Spotify')).toBeTruthy();
    });
  
    it('contains a "Guest" button', () => {
      const { getByText } = render(<LoginScreen />);
      expect(getByText('Guest')).toBeTruthy();
    });
  
    it('navigates to the Main screen when "Guest" button is pressed', async () => {
      const mockNavigate = jest.fn();
      jest.mock('@react-navigation/native', () => ({
        ...jest.requireActual('@react-navigation/native'),
        useNavigation: () => ({
          navigate: mockNavigate,
        }),
      }));
      const { getByText } = render(<LoginScreen />);
      const guestButton = getByText('Guest');
      fireEvent.press(guestButton);
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('Main');
      });
    });
  
    it('calls promptAsync when "Sign In with Spotify" button is pressed', async () => {
      const mockPromptAsync = jest.fn();
      jest.mock('@react-navigation/native', () => ({
        ...jest.requireActual('@react-navigation/native'),
        useNavigation: () => ({
          navigate: jest.fn(),
        }),
      }));
      jest.mock('expo-auth-session', () => ({
        ...jest.requireActual('expo-auth-session'),
        useAuthRequest: () => [null, null, mockPromptAsync],
      }));
      const { getByText } = render(<LoginScreen />);
      const spotifyButton = getByText('Sign In with Spotify');
      fireEvent.press(spotifyButton);
      await waitFor(() => {
        expect(mockPromptAsync).toHaveBeenCalled();
      });
    });
  });