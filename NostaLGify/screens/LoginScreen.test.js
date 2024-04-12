import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from './LoginScreen';

describe('LoginScreen component', () => {
    test('renders correctly', () => {
        const { getByText } = render(<LoginScreen />);
        expect(getByText('Nostalgify')).toBeDefined();
    });

    test('calls promptAsync when "Sign In with Spotify" button is pressed', () => {
        const { getByText } = render(<LoginScreen />);
        const signInButton = getByText('Sign In with Spotify');
        const mockPromptAsync = jest.fn();
        signInButton.props.onPress = mockPromptAsync;
        fireEvent.press(signInButton);
        expect(mockPromptAsync).toHaveBeenCalled();
    });

    test('calls navigateToMain when "Guest" button is pressed', () => {
        const { getByText } = render(<LoginScreen />);
        const guestButton = getByText('Guest');
        const mockNavigateToMain = jest.fn();
        LoginScreen.prototype.navigateToMain = mockNavigateToMain;
        fireEvent.press(guestButton);
        expect(mockNavigateToMain).toHaveBeenCalled();
    });

    test('handleResponse handles success response correctly', async () => {
        const mockExchangeCodeForToken = jest.fn(() => Promise.resolve({}));
        const mockSetItem = jest.fn();
        jest.mock('@react-native-async-storage/async-storage', () => ({
            __esModule: true,
            default: { setItem: mockSetItem },
        }));
        jest.mock('./TokenService', () => ({
            exchangeCodeForToken: mockExchangeCodeForToken,
        }));

        const { getByText } = render(<LoginScreen />);
        const successResponse = { type: 'success', params: { code: 'mockCode' } };
        await getByText('Sign In with Spotify').props.onPress(successResponse);

        expect(mockExchangeCodeForToken).toHaveBeenCalledWith('mockCode');
        expect(mockSetItem).toHaveBeenCalled();
    });

    test('handleResponse does not throw error for null response', async () => {
        const mockExchangeCodeForToken = jest.fn(() => Promise.resolve({}));
        jest.mock('./TokenService', () => ({
            exchangeCodeForToken: mockExchangeCodeForToken,
        }));

        const { getByText } = render(<LoginScreen />);
        await getByText('Sign In with Spotify').props.onPress(null);

        expect(mockExchangeCodeForToken).not.toHaveBeenCalled();
    });

    test('handleResponse handles error response correctly', async () => {
        const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
        const mockExchangeCodeForToken = jest.fn(() => Promise.reject(new Error('mockError')));
        jest.mock('./TokenService', () => ({
            exchangeCodeForToken: mockExchangeCodeForToken,
        }));

        const { getByText } = render(<LoginScreen />);
        const errorResponse = { type: 'error' };
        await getByText('Sign In with Spotify').props.onPress(errorResponse);

        expect(mockConsoleError).toHaveBeenCalledWith('Error exchanging code for token:', expect.any(Error));
    });
});
