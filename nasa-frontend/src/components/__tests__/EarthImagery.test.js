import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import Jest DOM extensions
import EarthImagery from '../EarthImagery';
import { fetchEarthImagery } from '../../services/earthImageryAPI';

// Mock the API function
jest.mock('../../services/earthImageryAPI', () => ({
    fetchEarthImagery: jest.fn(),
}));

describe('EarthImagery component', () => {
    test('fetches and displays Earth imagery on button click', async () => {
        // Mock API response
        const imageUrl = 'https://example.com/image.jpg';
        fetchEarthImagery.mockResolvedValue(imageUrl);

        render(<EarthImagery />);

        // Simulate user input
        fireEvent.change(screen.getByLabelText(/Longitude/i), { target: { value: '50' } });
        fireEvent.change(screen.getByLabelText(/Latitude/i), { target: { value: '40' } });
        fireEvent.change(screen.getByLabelText(/Select Date/i), { target: { value: '2024-04-25' } });

        // Simulate button click
        fireEvent.click(screen.getByRole('button', { name: /Fetch Earth Imagery/i }));

        // Wait for API call to resolve
        await waitFor(() => {
            expect(fetchEarthImagery).toHaveBeenCalledWith('50', '40', '2024-04-25');
        });
    });
});
