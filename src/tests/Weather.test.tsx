// weatherdata.test.tsx

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import WeatherCard from '../WeatherCard';

describe('WeatherCard Component', () => {
  test('renders weather card correctly', () => {
    const weatherData = {
      city: 'New York',
      temperature: '26°C',
      humidity: '56%',
      windSpeed: '15 km/h',
      onSearchClick: jest.fn(),
    };
    const { getByText, getByTestId } = render(<WeatherCard {...weatherData} />);
    expect(getByText('New York')).toBeInTheDocument();
    expect(getByText('Temperature: 26°C')).toBeInTheDocument();
    expect(getByText('Humidity: 56%')).toBeInTheDocument();
    expect(getByText('Wind Speed: 15 km/h')).toBeInTheDocument();
    expect(getByTestId('sunny-icon')).toBeInTheDocument();
  });

  test('expands card on click', async () => {
    const weatherData = {
      city: 'New York',
      temperature: '26°C',
      humidity: '56%',
      windSpeed: '15 km/h',
      onSearchClick: jest.fn(),
    };
    const { getByTestId } = render(<WeatherCard {...weatherData} />);
    const card = getByTestId('background-image');
    expect(card).not.toHaveClass('expanded');
    fireEvent.click(card);
    expect(card).toHaveClass('expanded');
  });

  test('collapses card on second click', async () => {
    const weatherData = {
      city: 'New York',
      temperature: '26°C',
      humidity: '56%',
      windSpeed: '15 km/h',
      onSearchClick: jest.fn(),
    };
    const { getByTestId } = render(<WeatherCard {...weatherData} />);
    const card = getByTestId('background-image');
    fireEvent.click(card);
    fireEvent.click(card);
    expect(card).not.toHaveClass('expanded');
  });
});
