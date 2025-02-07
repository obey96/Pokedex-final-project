import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';


describe('Navbar Component', () => {
    let handleLogout;

    beforeEach(() => {
        handleLogout = jest.fn();
    });

    it('renders without crashing', () => {
        render(
            <BrowserRouter>
                <Navbar user={null} onLogout={handleLogout} />
            </BrowserRouter>
        );
        expect(screen.getByText(/Pokedex App/i)).toBeInTheDocument();
    });

    it('shows login and signup links when user is not logged in', () => {
        render(
            <BrowserRouter>
                <Navbar user={null} onLogout={handleLogout} />
            </BrowserRouter>
        );
        expect(screen.getByText(/Login/i)).toBeInTheDocument();
        expect(screen.getByText(/Signup/i)).toBeInTheDocument();
    });

    it('shows favorites and logout button when user is logged in', () => {
        render(
            <BrowserRouter>
                <Navbar user={{ name: 'Ash' }} onLogout={handleLogout} />
            </BrowserRouter>
        );
        expect(screen.getByText(/Favorites/i)).toBeInTheDocument();
        expect(screen.getByText(/Logout/i)).toBeInTheDocument();
    });

    it('calls onLogout when logout button is clicked', () => {
        render(
            <BrowserRouter>
                <Navbar user={{ name: 'Ash' }} onLogout={handleLogout} />
            </BrowserRouter>
        );
        fireEvent.click(screen.getByText(/Logout/i));
        expect(handleLogout).toBeCalledTimes(1);
    });
});
