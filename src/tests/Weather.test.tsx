import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WeatherCard from '../WeatherCard';

describe('WeatherCard Component', () => {
  it('renders correctly', () => {
    render(
      <WeatherCard
        city="New York"
        temperature="26°C"
        humidity="56%"
        windSpeed="15 km/h"
        onSearchClick={() => {}}
      />
    );

    // Check if the city name is rendered
    expect(screen.getByText(/New York/i)).toBeInTheDocument();
    // Check if the temperature is rendered
    expect(screen.getByText(/26°C/i)).toBeInTheDocument();
    // Check if the humidity is rendered
    expect(screen.getByText(/56%/i)).toBeInTheDocument();
    // Check if the wind speed is rendered
    expect(screen.getByText(/15 km\/h/i)).toBeInTheDocument();
  });

  it('fetches description when card is clicked', async () => {
    // Mock the fetch function to return sample data
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        description: 'Sample description',
        forecast: {
          'Wed': '28°C',
          'Thu': '29°C',
          'Fri': '27°C',
          'Sat': '26°C',
          'Sun': '25°C'
        }
      })
    } as any);

    render(
      <WeatherCard
        city="New York"
        temperature="26°C"
        humidity="56%"
        windSpeed="15 km/h"
        onSearchClick={() => {}}
      />
    );

    // Click on the weather card
    fireEvent.click(screen.getByTestId('background-image'));

    // Wait for the description to be displayed
    const descriptionElement = await screen.findByText(/Sample description/i);

    // Assertion
    expect(descriptionElement).toBeInTheDocument();
    // Check if the forecast is displayed
    expect(screen.getByText(/Wed/i)).toBeInTheDocument();
    expect(screen.getByText(/Thu/i)).toBeInTheDocument();
    expect(screen.getByText(/Fri/i)).toBeInTheDocument();
    expect(screen.getByText(/Sat/i)).toBeInTheDocument();
    expect(screen.getByText(/Sun/i)).toBeInTheDocument();
  });
});
