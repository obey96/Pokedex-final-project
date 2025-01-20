import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// Mocking localStorage
beforeEach(() => {
  localStorage.clear();
  jest.spyOn(console, "log").mockImplementation(() => {}); // Suppress console logs during tests
});

afterAll(() => {
  console.log.mockRestore();
});

describe("App Component", () => {
  test("redirects to login page when user is not logged in", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.queryByText("Home Page")).not.toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test("renders home page when user is logged in", () => {
    localStorage.setItem("token", "dummyToken");
    localStorage.setItem("user", JSON.stringify({ name: "Test User" }));

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/home page/i)).toBeInTheDocument();
  });

  test("logs out user and redirects to login page", () => {
    localStorage.setItem("token", "dummyToken");
    localStorage.setItem("user", JSON.stringify({ name: "Test User" }));

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    const logoutButton = screen.getByText("Logged In");
    fireEvent.click(logoutButton);

    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test("renders favorites page when user is logged in", () => {
    localStorage.setItem("token", "dummyToken");
    localStorage.setItem("user", JSON.stringify({ name: "Test User" }));

    render(
      <MemoryRouter initialEntries={["/favorites"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/favorites page/i)).toBeInTheDocument();
  });

  test("prevents access to favorites page when user is not logged in", () => {
    render(
      <MemoryRouter initialEntries={["/favorites"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test("login sets the user and redirects to home page", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );

    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);

    expect(localStorage.getItem("user")).toEqual(JSON.stringify({ name: "Test User" }));
    expect(screen.getByText(/home page/i)).toBeInTheDocument();
  });
});
