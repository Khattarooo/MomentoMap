import React from 'react';
import {render, act, fireEvent} from '@testing-library/react-native';
import Home from './Home';
import GetLocation from 'react-native-get-location';
import * as permissionUtils from '../../utils/permissionUtils';

jest.mock('react-native-get-location', () => ({
  getCurrentPosition: jest.fn(),
}));

jest.mock('../../utils/permissionUtils', () => ({
  requestLocationPermission: jest.fn(),
}));

const mockNavigation = {
  navigate: jest.fn(),
};

describe('Home Component', () => {
  beforeEach(() => {
    GetLocation.getCurrentPosition.mockClear();
    permissionUtils.requestLocationPermission.mockClear();
    mockNavigation.navigate.mockClear();
  });

  it('requests location permission on mount', async () => {
    render(<Home navigation={mockNavigation} />);
    expect(permissionUtils.requestLocationPermission).toHaveBeenCalledTimes(1);
  });

  it('gets current location on mount', async () => {
    GetLocation.getCurrentPosition.mockResolvedValue({
      latitude: 0,
      longitude: 0,
    });

    render(<Home navigation={mockNavigation} />);

    await act(async () => {
      await GetLocation.getCurrentPosition;
    });

    expect(GetLocation.getCurrentPosition).toHaveBeenCalledTimes(1);
  });

  test('cycles through quotes', () => {
    jest.useFakeTimers();
    const {getByTestId} = render(<Home navigation={mockNavigation} />);

    const firstQuote = getByTestId('quote-text');
    expect(firstQuote.props.children).toMatch(
      /Navigate Your Nostalgia, Frame Your Journey./i,
    );

    act(() => {
      jest.advanceTimersByTime(6000);
    });

    const secondQuote = getByTestId('quote-text');
    expect(secondQuote.props.children).toMatch(
      /Where Every Pin Tells a Story./i,
    );

    jest.useRealTimers();
  });
  test('Background should be the file w1.jpg', () => {
    const {getByTestId} = render(<Home />);
    const backgroundImage = getByTestId('background-image');
    expect(backgroundImage.props.source).toEqual(
      require('../../assets/w1.jpg'),
    );
  });
});
