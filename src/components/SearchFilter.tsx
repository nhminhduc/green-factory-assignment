import useDebounce from "@/hooks/useDebounce";
import React, { useEffect, useState } from "react";

interface Props {
  onSearch: (name: string, country: string) => void;
}

const SearchFilter: React.FC<Props> = ({ onSearch }) => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const debouncedName = useDebounce(name, 500);
  const debouncedCountry = useDebounce(country, 500);

  useEffect(() => {
    if (debouncedName || debouncedCountry) {
      onSearch(debouncedName, debouncedCountry);
    }
  }, [debouncedName, debouncedCountry, onSearch]);

  return (
    <div className="flex flex-wrap gap-4 justify-center my-2">
      <input
        type="text"
        placeholder="University name"
        className="px-4 py-2 rounded-md border w-full sm:w-auto"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Country"
        className="px-4 py-2 rounded-md border w-full sm:w-auto"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        onClick={() => onSearch(name, country)}
      >
        Retry
      </button>
    </div>
  );
};

export default SearchFilter;
