import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

describe('App Component', () => {
  test('renders app title correctly', () => {
    const { getByText } = render(<App />);
    expect(getByText("How's the Weather?")).toBeInTheDocument();
  });

  test('search input allows user to type', async () => {
    const { getByPlaceholderText } = render(<App />);
    const searchInput = getByPlaceholderText('Search for a city...') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'New York' } });
    expect(searchInput.value).toBe('New York');
  });

  test('search input triggers search click', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const searchInput = getByPlaceholderText('Search for a city...') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'New York' } });
    fireEvent.click(searchInput);
    await waitFor(() => expect(getByText('City not found.')).toBeInTheDocument());
  });
});
