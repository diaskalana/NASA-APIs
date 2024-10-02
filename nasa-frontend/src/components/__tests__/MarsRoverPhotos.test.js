import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MarsRoverPhotos from '../MarsRoverPhotos';
import { fetchMarsRoverPhotos } from '../../services/marsRoverAPI';

jest.mock('../../services/marsRoverAPI');

describe('MarsRoverPhotos component', () => {
    test('renders camera options and fetches photos', async () => {
        const mockPhotos = [
            { id: 1, img_src: 'https://example.com/photo1.jpg' },
            { id: 2, img_src: 'https://example.com/photo2.jpg' },
            // Add more mock photos as needed
        ];

        fetchMarsRoverPhotos.mockResolvedValue(mockPhotos);

        render(<MarsRoverPhotos />);

        // Assert that camera options are rendered
        expect(screen.getByText(/Front Hazard Avoidance Camera/i)).toBeInTheDocument();

    });

});
