import { useState, Suspense, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchFilter from "./components/SearchFilter";
import ResultsTable from "./components/ResultsTable";
import CustomErrorBoundary from "./components/CustomErrorBoundary";
import Header from "./components/Header";

const queryClient = new QueryClient();

function App() {
  const [searchParams, setSearchParams] = useState({ name: "", country: "" });

  const handleSearch = useCallback((name: string, country: string) => {
    setSearchParams({ name, country });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          University Search
        </h1>
        <SearchFilter onSearch={handleSearch} />
        <CustomErrorBoundary>
          <Suspense fallback={<div className="text-center">Loading...</div>}>
            <ResultsTable searchParams={searchParams} />
          </Suspense>
        </CustomErrorBoundary>
      </div>
    </QueryClientProvider>
  );
}

export default App;
