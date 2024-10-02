import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import Jest DOM extensions
import DONKI from '../DONKI';
import { fetchDONKIData as mockFetchDONKIData } from '../../services/DONKIAPIService';

jest.mock('../../services/DONKIAPIService'); // Mock the API service module

describe('DONKI component', () => {
    test('renders select input and button', () => {
        render(<DONKI />);

        // Assert that the select input and button are rendered
        expect(screen.getByLabelText(/Select Information Type/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Fetch Data/i })).toBeInTheDocument();
    });

    test('fetches and displays data on button click', async () => {
        // Mock the data returned from the API service
        const mockData = [
            { activityID: '123', speed: '500 km/s', cmeAnalyses: [{ type: 'Halo' }] },
            { activityID: '456', speed: '400 km/s', cmeAnalyses: [{ type: 'Partial' }] },
        ];
        mockFetchDONKIData.mockResolvedValueOnce(mockData);

        render(<DONKI />);

        // Select the information type
        fireEvent.change(screen.getByLabelText(/Select Information Type/i), { target: { value: 'CME' } });
        fireEvent.click(screen.getByRole('button', { name: /Fetch Data/i }));

        // Wait for the loading state to disappear
        await waitFor(() => {
            expect(screen.queryByText(/Fetching.../i)).not.toBeInTheDocument();
        });

        // Assert that the data is displayed
        expect(screen.getByText(/CME Date: 123, Speed: 500 km\/s, Type: Halo/i)).toBeInTheDocument();
        expect(screen.getByText(/CME Date: 456, Speed: 400 km\/s, Type: Partial/i)).toBeInTheDocument();
    });
});
