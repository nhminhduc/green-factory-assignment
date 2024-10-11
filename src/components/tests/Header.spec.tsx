import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../Header";

describe("Header", () => {
  it("renders correctly", () => {
    render(<Header />);
    expect(screen.getByText("University Search")).toBeInTheDocument();

    // Shows login button when not authenticated
    expect(screen.getByText("Login")).toBeInTheDocument();

    // Shows logout button when authenticated
    fireEvent.click(screen.getByText("Login"));
    expect(screen.getByText("Log out")).toBeInTheDocument();

    // Log out correctly
    fireEvent.click(screen.getByText("Log out"));
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
