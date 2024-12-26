import { useEffect, useState } from "react";
import axios from "axios";

export default function SearchBar({
  query,
  setQuery,
  setResults,
  setLoading,
  isWordSearch,
}) {
  useEffect(() => {
    handleQuerySubmit();
  }, [isWordSearch]);

  const handleQuerySubmit = async () => {
    if (query.length === 0) {
    } else {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/process", {
          params: {
            query: query,
            isWordSearch: isWordSearch,
          },
        });
        setResults(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.error("Error processing query:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          onChange={setQuery}
          value={query}
        />
        <button className="search-button" onClick={handleQuerySubmit}>
          <i className="fas fa-search"></i>
        </button>
      </div>
    </div>
  );
}
