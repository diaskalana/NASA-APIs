import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import APOD from '../APOD';

// Mock the fetchAPOD function
jest.mock('../../services/apodAPI');

describe('APOD component', () => {
    test('renders component with date input and fetch button', () => {
        render(<APOD />);
        expect(screen.getByLabelText(/select date/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /fetch apod/i })).toBeInTheDocument();
    });
});
