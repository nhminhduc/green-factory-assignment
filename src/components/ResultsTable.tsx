import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { University } from "@/types";
import { useAuthStore } from "@/store/authStore";
import { useUniversitiesStore } from "@/store/universitiesStore";

interface ResultsTableProps {
  searchParams: { name: string; country: string };
}

const fetchUniversities = async (
  name: string,
  country: string
): Promise<University[]> => {
  let url = `http://universities.hipolabs.com/search`;
  const params = new URLSearchParams();

  if (name) params.append("name", name);
  if (country) params.append("country", country);

  url += `?${params.toString()}`;

  try {
    const startTime = performance.now();
    const response = await fetch(url);
    const endTime = performance.now();

    if (!response.ok) {
      throw new Error("Failed to fetch universities");
    }

    const duration = endTime - startTime;
    useUniversitiesStore.getState().addSearchDuration(duration);
    return await response.json();
  } catch (error) {
    console.error("Error fetching universities:", error);
    throw error;
  }
};

const ResultsTable = ({ searchParams }: ResultsTableProps) => {
  const { isAuthenticated } = useAuthStore();
  const { name, country } = searchParams;
  const queryEnabled = name.trim() !== "" || country.trim() !== "";

  const {
    data: universities,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["universities", name, country],
    queryFn: () => fetchUniversities(name, country),
    enabled: queryEnabled,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.max(
    universities ? Math.ceil(universities.length / itemsPerPage) : 0,
    1
  );

  const currentUniversities = universities?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (!isAuthenticated) return <div>You must login first</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching universities.</div>;

  const maxPageToShow = 3;
  const startPage = Math.max(currentPage - maxPageToShow, 1);
  const endPage = Math.min(currentPage + maxPageToShow, totalPages);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-left whitespace-no-wrap">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b-2">Name</th>
              <th className="px-4 py-2 border-b-2">Country</th>
              <th className="px-4 py-2 border-b-2">Website</th>
            </tr>
          </thead>
          <tbody>
            {currentUniversities?.map((uni) => (
              <tr key={uni.name}>
                <td>{uni.name}</td>
                <td>{uni.country}</td>
                <td>
                  <a
                    href={uni.web_pages[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1 || universities?.length === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
          title="Go to first page"
        >
          &laquo; First
        </button>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1 || universities?.length === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
          title="Go to previous page"
        >
          &lsaquo; Prev
        </button>
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i
        ).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            disabled={currentPage === page || universities?.length === 0}
            className={`px-4 py-2 ${
              currentPage === page ? "bg-blue-700" : "bg-blue-500"
            } text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50`}
            title={`Go to page ${page}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= totalPages || universities?.length === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
          title="Go to next page"
        >
          Next &rsaquo;
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage >= totalPages || universities?.length === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
          title="Go to last page"
        >
          Last &raquo;
        </button>
      </div>
    </>
  );
};

export default ResultsTable;
