import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchWebApi, getCurrentTrack, fetchCurrentTrack } from './HomeScreen';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import HomeScreen from './HomeScreen'; // Adjust the path if needed

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));
jest.mock('react', () => ({
  ...jest.requireActual('react'), // Keep all actual exports from 'react'
  useState: jest.fn(), // Mock useState
}));
jest.mock('./HomeScreen', () => ({
  fetchWebApi: jest.fn(),
  getCurrentTrack: jest.fn(),
  fetchCurrentTrack: jest.fn(),
}));

beforeEach(() => {
  AsyncStorage.getItem.mockClear();
  fetchWebApi.mockClear();
  getCurrentTrack.mockClear();
  fetchCurrentTrack.mockClear();
});

describe('fetchWebApi', () => {
    test('should fetch data from Spotify API', async () => {
      // Mocking the fetch function
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ data: 'mocked data' }),
        })
      );
  
      // Call the function
      const result = await fetchWebApi('endpoint', 'GET', null, 'token');
  
      // Assert
      expect(result).toEqual({ data: 'mocked data' });
      expect(fetch).toHaveBeenCalledWith(expect.any(String), {
        headers: expect.any(Object),
        method: 'GET',
      });
    });
  });

  describe('getCurrentTrack', () => {
    test('should fetch current track from Spotify API', async () => {
      // Mocking the fetchWebApi function
      const mockFetchWebApi = jest.fn(() => Promise.resolve({ item: { name: 'Mocked Track' } }));
      jest.spyOn(global, 'fetchWebApi').mockImplementation(mockFetchWebApi);
  
      // Call the function
      const result = await getCurrentTrack('token');
  
      // Assert
      expect(result).toEqual({ item: { name: 'Mocked Track' } });
      expect(mockFetchWebApi).toHaveBeenCalledWith('v1/me/player/currently-playing', 'GET', null, 'token');
    });
  });
  
  describe('fetchCurrentTrack', () => {
    test('should fetch current track and set state', async () => {
      // Mocking AsyncStorage.getItem and getCurrentTrack functions
      AsyncStorage.getItem = jest.fn(() => Promise.resolve('mockedToken'));
      const mockGetCurrentTrack = jest.fn(() => Promise.resolve({ item: { name: 'Mocked Track' } }));
      jest.spyOn(global, 'getCurrentTrack').mockImplementation(mockGetCurrentTrack);
  
      // Call the function
      await fetchCurrentTrack();
  
      // Assert
      expect(mockGetCurrentTrack).toHaveBeenCalledWith('mockedToken');
      expect(setCurrentTrack).toHaveBeenCalledWith({ name: 'Mocked Track' });
    });
  });

  describe('HomeScreen Component', () => {
    test('should render current track information if track is available', () => {
      const mockCurrentTrack = { album: { images: [{ url: 'mockedUrl' }] }, name: 'Mocked Track', artists: [{ name: 'Artist' }] };
      useState.mockReturnValueOnce([mockCurrentTrack, jest.fn()]);
  
      const { getByText, getByTestId } = render(<HomeScreen />);
  
      expect(getByTestId('albumCover').props.source.uri).toBe('mockedUrl');
      expect(getByText('Mocked Track')).toBeInTheDocument();
      expect(getByText('Artist')).toBeInTheDocument();
    });
  
    test('should render no track message if no track is available', () => {
      useState.mockReturnValueOnce([null, jest.fn()]);
  
      const { getByText } = render(<HomeScreen />);
  
      expect(getByText('No track currently playing')).toBeInTheDocument();
    });
  });

  describe('HomeScreen Styles', () => {
    test('should match snapshot', () => {
      const tree = renderer.create(<HomeScreen />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('fetchCurrentTrack Error Handling', () => {
    test('should log error if access token not found', async () => {
      AsyncStorage.getItem = jest.fn(() => Promise.resolve(null));
      console.error = jest.fn();
  
      await fetchCurrentTrack();
  
      expect(console.error).toHaveBeenCalledWith('Access token not found in AsyncStorage');
    });
  
    test('should log error if error occurs during track fetch', async () => {
      AsyncStorage.getItem = jest.fn(() => Promise.resolve('mockedToken'));
      global.console.error = jest.fn();
      getCurrentTrack.mockRejectedValueOnce('mockedError');
  
      await fetchCurrentTrack();
  
      expect(console.error).toHaveBeenCalledWith('Error fetching current track:', 'mockedError');
    });
  });
  