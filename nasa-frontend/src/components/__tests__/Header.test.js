import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';
import { getAuthToken, removeAuthToken } from '../../tokenStorage';

// Mock the token functions
jest.mock('../../tokenStorage', () => ({
    getAuthToken: jest.fn(),
    removeAuthToken: jest.fn(),
}));

describe('Header component', () => {
    test('renders navigation links correctly for authenticated user', () => {
        // Mock authentication
        getAuthToken.mockReturnValue('fakeAuthToken');

        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        expect(screen.getByText(/APOD/i)).toBeInTheDocument();
        expect(screen.getByText(/Mars Rover Photos/i)).toBeInTheDocument();
        expect(screen.getByText(/Logout/i)).toBeInTheDocument();
    });

    test('renders navigation links correctly for unauthenticated user', () => {
        // Mock unauthenticated user
        getAuthToken.mockReturnValue(null);

        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        expect(screen.getByText(/APOD/i)).toBeInTheDocument();
        expect(screen.getByText(/Mars Rover Photos/i)).toBeInTheDocument();
        expect(screen.getByText(/Login/i)).toBeInTheDocument();
        expect(screen.getByText(/Register/i)).toBeInTheDocument();
    });

    test('calls removeAuthToken and navigates to login page when logout button is clicked', () => {
        // Mock authentication
        getAuthToken.mockReturnValue('fakeAuthToken');

        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const logoutButton = screen.getByText(/Logout/i);
        fireEvent.click(logoutButton);

        expect(removeAuthToken).toHaveBeenCalledTimes(1);
        expect(window.location.href).toContain('/login');
    });
});
