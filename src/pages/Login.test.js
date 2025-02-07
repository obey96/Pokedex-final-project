import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';

jest.mock('axios');

describe('Login Component', () => {
    let setUser;
  
    beforeEach(() => {
        setUser = jest.fn();
    });

    it('renders the login form correctly', () => {
        render(
            <MemoryRouter>
                <Login setUser={setUser} />
            </MemoryRouter>
        );

        expect(screen.getByText(/Login/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    });

    it('updates input fields on change', () => {
        render(
            <MemoryRouter>
                <Login setUser={setUser} />
            </MemoryRouter>
        );

        const emailInput = screen.getByLabelText(/Email/i);
        const passwordInput = screen.getByLabelText(/Password/i);

        fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(emailInput.value).toBe('user@example.com');
        expect(passwordInput.value).toBe('password123');
    });

    it('displays an error message on login failure', async () => {
        axios.post.mockRejectedValueOnce({
            response: { data: { message: 'Invalid credentials' } },
        });

        render(
            <MemoryRouter>
                <Login setUser={setUser} />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'wrong@mail.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrongpass' } });

        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        expect(await screen.findByText(/Invalid credentials/i)).toBeInTheDocument();
    });

    it('logs in successfully and redirects', async () => {
        const mockUser = { id: 1, email: 'user@example.com' };
        const mockToken = 'test-token';

        axios.post.mockResolvedValueOnce({
            status: 200,
            data: { user: mockUser, token: mockToken },
        });

        render(
            <MemoryRouter>
                <Login setUser={setUser} />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'user@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        expect(setUser).toHaveBeenCalledWith(mockUser);
    });
});
