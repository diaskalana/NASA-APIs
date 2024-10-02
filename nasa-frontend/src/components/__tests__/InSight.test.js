import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import Jest DOM extensions
import InSight from '../InSight';
import { fetchInSightWeatherData } from '../../services/InSightAPIService'; // Import the mocked API service

// Mock the API service
jest.mock('../../services/InSightAPIService');

describe('InSight component', () => {
    test('renders weather data correctly', async () => {
        // Mock the response from the API service
        const mockWeatherData = {
            "sol1": { AT: { av: -23 }, HWS: { av: 2.5 } },
            "sol2": { AT: { av: -24 }, HWS: { av: 3.0 } }
        };
        fetchInSightWeatherData.mockResolvedValue(mockWeatherData);

        // Render the component
        render(<InSight />);

        // Simulate user interaction
        fireEvent.change(screen.getByLabelText('Enter Date:'), { target: { value: '2024-04-22' } });
        fireEvent.click(screen.getByText('Fetch Weather Data'));

        // Wait for the loading indicator to disappear
        await waitFor(() => expect(screen.queryByText('Fetching...')).not.toBeInTheDocument());

    });
});
