import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import Jest DOM extensions
import ImageVideoLibrary from '../../components/ImageVideoLibrary';
import { fetchImagesAndVideos } from '../../services/NASAImageVideoLibraryAPI';

jest.mock('../../services/NASAImageVideoLibraryAPI');

describe('ImageVideoLibrary component', () => {
    test('renders search input and button', () => {
        render(<ImageVideoLibrary />);

        expect(screen.getByLabelText(/Search Images and Videos:/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
    });

    test('fetches data and displays images/videos', async () => {
        const testData = [
            {
                data: [{ title: 'Test Image 1', media_type: 'image' }],
                links: [{ href: 'test_image_1.jpg' }]
            },
            {
                data: [{ title: 'Test Video 1', media_type: 'video' }],
                links: [{ href: 'test_video_1.mp4' }]
            }
        ];
        fetchImagesAndVideos.mockResolvedValueOnce(testData);

        render(<ImageVideoLibrary />);

        const searchInput = screen.getByLabelText(/Search Images and Videos:/i);
        const searchButton = screen.getByRole('button', { name: /Search/i });

        fireEvent.change(searchInput, { target: { value: 'test' } });
        fireEvent.click(searchButton);

        await waitFor(() => {
            expect(fetchImagesAndVideos).toHaveBeenCalledTimes(1);
        });
    });

    test('displays loading state while fetching data', async () => {
        fetchImagesAndVideos.mockResolvedValueOnce([]);

        render(<ImageVideoLibrary />);

        const searchButton = screen.getByRole('button', { name: /Search/i });
        fireEvent.click(searchButton);

        await waitFor(() => {
            expect(screen.getByText(/Fetching.../i)).toBeInTheDocument();
        });
    });

});
