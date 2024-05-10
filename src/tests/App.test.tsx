import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  it('displays description when card is expanded', async () => {
    render(<App />);

    // Mock the fetch function to return sample data
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        'New York': {
          temperature: '26°C',
          humidity: '56%',
          windSpeed: '15 km/h'
        }
      })
    } as any);

    // Simulate typing into the city input
    fireEvent.change(screen.getByPlaceholderText('Search for a city...'), { target: { value: 'New York' } });

    // Wait for the weather card to be displayed
    const cardElement = await screen.findByTestId('background-image');

    // Click on the weather card to expand it
    fireEvent.click(cardElement);

    // Wait for the description to be displayed
    const descriptionElement = await screen.findByText(/According to the Köppen climate classification/i);

    // Assertion
    expect(descriptionElement).toBeInTheDocument();
  });
});
