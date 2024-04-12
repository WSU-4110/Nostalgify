import React from 'react';
import { render } from '@testing-library/react-native';
import SearchScreen from './SearchScreen';

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
}));

jest.mock('./SearchScreen', () => ({
    fetchWebApi: jest.fn(),
    getPlaylists: jest.fn(),
}));

describe('SearchScreen component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders "Your Library" text', () => {
        const { getByText } = render(<SearchScreen />);
        expect(getByText('Your Library')).toBeTruthy();
    });
      

    test('renders correctly', () => {
        const { toJSON } = render(<SearchScreen />);
        expect(toJSON()).toMatchSnapshot();
    });

    test('renders playlists', () => {
        const mockPlaylists = [
            { id: 1, name: 'Playlist 1' },
        ];
        jest.spyOn(React, 'useState').mockReturnValueOnce([mockPlaylists, jest.fn()]);

        const { getByText } = render(<SearchScreen />);
        expect(getByText('March 24')).toBeTruthy();
    });

    test('fetches playlists', () => {
        const mockFetchPlaylists = jest.fn();
        jest.spyOn(React, 'useEffect').mockImplementationOnce((f) => f());
        jest.spyOn(React, 'useState').mockReturnValueOnce([null, mockFetchPlaylists]);

        render(<SearchScreen />);
        expect(mockFetchPlaylists).toHaveBeenCalledTimes(1);
    });

    test('handles AsyncStorage error', () => {
        AsyncStorage.getItem.mockResolvedValueOnce(null);
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        render(<SearchScreen />);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Access token not found in AsyncStorage');

        consoleErrorSpy.mockRestore();
    });

    test('handles fetch error', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        getPlaylists.mockRejectedValueOnce('Fetch error');

        render(<SearchScreen />);
        await waitFor(() => expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching current track:', 'Fetch error'));

        consoleErrorSpy.mockRestore();
    });


});
