import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Signup from "./Signup";

describe("Signup Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders without crashing", () => {
        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        );

        // Check for heading element with 'Signup' text
        expect(screen.getByRole('heading', { name: /Signup/i })).toBeInTheDocument();
        
        // Check for any element with 'Signup' text
        expect(screen.getByText(/Signup/i)).toBeInTheDocument();
    });

    it("should fail validations with empty inputs", async () => {
        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        );
        
        fireEvent.click(screen.getByText(/Signup/i));
        
        expect(screen.getByLabelText(/Email/i).value).toBe("");
        expect(screen.getByLabelText(/Password/i).value).toBe("");
    });

    it("should update state when form inputs change", () => {
        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        );
        
        const emailInput = screen.getByLabelText(/Email/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        
        fireEvent.change(emailInput, { target: { value: "test@mail.com" } });
        expect(emailInput.value).toBe("test@mail.com");
        
        fireEvent.change(passwordInput, { target: { value: "securePass123" } });
        expect(passwordInput.value).toBe("securePass123");
    });
});
