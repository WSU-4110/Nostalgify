import React from 'react';
import { render, waitFor, act } from '@testing-library/react-native';
import ProfileScreen from './screens/ProfileScreen';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

const newToken = 'token'; 

describe('ProfileScreen', () => {
  test('if fetch for user info is correct', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(newToken);

    await act(async () => {
      const { getByText } = render(<ProfileScreen />);

      await waitFor(() => {
        expect(getByText('unknown user')).toBeTruthy();
      });
    });
  });

  test('if fetch for top tracks is correct ', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(newToken);

    await act(async () => {
      const { getByText } = render(<ProfileScreen />);

      await waitFor(() => {
        expect(getByText('top songs')).toBeTruthy();
      });
    });
  });

  test('if fetch for recently played tracks is correct ', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(newToken);

    await act(async () => {
      const { getByText } = render(<ProfileScreen />);

      await waitFor(() => {
        expect(getByText('recently played')).toBeTruthy();
      });
    });
  });

  test('if unknown user comes up when no data is pulled from profile', async () => {
    AsyncStorage.getItem.mockRejectedValueOnce('Error fetching user info');

    await act(async () => {
      const { getByText } = render(<ProfileScreen />);

      await waitFor(() => {
        expect(getByText('unknown user')).toBeTruthy();
      });
    });
  });

  test('if it renders "top songs" when the track data doesnt come thru', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(newToken);
    getTopTracks.mockRejectedValueOnce('Error fetching top tracks');

    await act(async () => {
      const { getByText } = render(<ProfileScreen />);

      await waitFor(() => {
        expect(getByText('top songs')).toBeTruthy();
      });
    });
  });

  test('if it renders "recently played" when track data doesnt come thru', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(newToken);
    getRecentTracks.mockRejectedValueOnce('Error fetching recently played tracks');

    await act(async () => {
      const { getByText } = render(<ProfileScreen />);

      await waitFor(() => {
        expect(getByText('recently played')).toBeTruthy();
      });
    });
  });
});
