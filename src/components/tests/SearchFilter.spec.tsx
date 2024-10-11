import { render, screen, fireEvent } from "@testing-library/react";
import SearchFilter from "../SearchFilter";

describe("SearchFilter", () => {
  it("calls onSearch with name and country when input values change and button is clicked", () => {
    const mockOnSearch = vi.fn();
    render(<SearchFilter onSearch={mockOnSearch} />);

    fireEvent.change(screen.getByPlaceholderText(/university name/i), {
      target: { value: "Harvard" },
    });

    fireEvent.change(screen.getByPlaceholderText(/country/i), {
      target: { value: "USA" },
    });

    fireEvent.click(screen.getByText(/retry/i));

    expect(mockOnSearch).toHaveBeenCalledWith("Harvard", "USA");
  });
});
