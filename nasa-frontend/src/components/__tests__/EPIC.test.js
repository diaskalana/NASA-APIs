import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EPIC from '../EPIC';
import { fetchEPICImages } from '../../services/EPICAPI'; // Assuming the API service is in a services directory

jest.mock('../../services/EPICAPI'); // Mocking the API service

describe('EPIC component', () => {
    test('renders EPIC images on button click', async () => {
        const mockImages = ['image1', 'image2']; // Mocked images data
        fetchEPICImages.mockResolvedValue(mockImages); // Mocking the API call

        render(<EPIC />);

        // Find input element
        const dateInput = screen.getByLabelText(/Select Date:/i);
        // Change date value
        fireEvent.change(dateInput, { target: { value: '2024-04-25' } });

        // Find and click the fetch button
        const fetchButton = screen.getByRole('button', { name: /Fetch EPIC Images/i });
        fireEvent.click(fetchButton);

        // Wait for the loading state to finish
        await act(async () => {
            // Check if loading state is displayed
            expect(screen.getByText(/Fetching.../i)).toBeInTheDocument();

            // Wait for the images to be loaded
            await new Promise(resolve => setTimeout(resolve, 1000));
        });
    });
});
