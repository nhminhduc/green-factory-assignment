import { fireEvent, render, screen } from "@testing-library/react";
import ResultsTable from "@/components/ResultsTable";
import { mockUniversities } from "@/mockData/universities";
import { vi } from "vitest";
import { useAuthStore } from "@/store/authStore";

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(() => ({
    data: mockUniversities,
    isLoading: false,
    error: null,
  })),
}));

const initialStoreState = useAuthStore.getState();
describe("ResultsTable", () => {
  beforeEach(() => {
    useAuthStore.setState({ ...initialStoreState, isAuthenticated: true });
  });
  test("renders result table", async () => {
    renderResultsTable();

    // Check if the mocked university data is rendered correctly
    expect(
      await screen.findByText(/Veer Kunwar Singh University/i)
    ).toBeInTheDocument();
  });
  test("navigates to the next page", async () => {
    renderResultsTable();

    const firstPageUniversity = await screen.findByText(
      new RegExp(mockUniversities[0].name, "i")
    );
    expect(firstPageUniversity).toBeInTheDocument();

    // Find and click the "Next" pagination button
    const nextPageButton = screen.getByTitle("Go to next page");
    fireEvent.click(nextPageButton);

    // Now, check for a university that would be on the next page
    const secondPageUniversity = await screen.findByText(
      new RegExp(mockUniversities[11].name, "i")
    );
    expect(secondPageUniversity).toBeInTheDocument();
  });

  test("navigates to the previous page", async () => {
    renderResultsTable();

    // Navigate to the second page first
    const nextPageButton = screen.getByTitle("Go to next page");
    fireEvent.click(nextPageButton);

    // Then, find and click the "Previous" pagination button
    const prevPageButton = screen.getByTitle("Go to previous page");
    fireEvent.click(prevPageButton);

    // Check for a university that would be on the first page again
    const firstPageUniversity = await screen.findByText(
      new RegExp(mockUniversities[0].name, "i")
    );
    expect(firstPageUniversity).toBeInTheDocument();
  });
});

const renderResultsTable = () => {
  return render(
    <ResultsTable
      searchParams={{
        name: "",
        country: "",
      }}
    />
  );
};
