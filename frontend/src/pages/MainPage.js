import { useState } from "react";
import SearchBar from "../components/SearchBar";
import "../App.css";
import "../MainPage.css";
import CircularProgress from "@mui/material/CircularProgress";
export default function MainPage() {
  const [query, setQuery] = useState("");
  // const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isWordSearch, setIsWordSearch] = useState(true);

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  const Loader = () => {
    return (
      <div className="loader">
        <CircularProgress />
        <p>Processing...</p>
      </div>
    );
  };
  const handleOptionChange = (isWordSearch) => {
    setIsWordSearch(isWordSearch);
  };

  function getFilePath(file_path) {
    // Find the index of the first occurrence of "highlighted_"
    const index = file_path.indexOf("highlighted_");
    // Extract the substring after the first occurrence of "highlighted_"
    const newPath = file_path.substring(index + "highlighted_".length);
    return newPath;
  }

  function getFileURl(file_name) {
    const url = "http://localhost:5000/file/" + file_name;
    console.log(url);
    return url;
  }
  return (
    <div className="query-result-interface">
      <SearchBar
        query={query}
        setQuery={handleQuery}
        setResults={setResults}
        setLoading={setLoading}
        isWordSearch={isWordSearch}
      ></SearchBar>
      <div className="button-container">
        <button
          className={isWordSearch ? "button active" : "button"}
          onClick={() => handleOptionChange(true)}
        >
          Word Search
        </button>
        <button
          className={!isWordSearch ? "button active" : "button"}
          onClick={() => handleOptionChange(false)}
        >
          Phrase Search
        </button>
      </div>
      <section className="ocr-section">
        {loading ? (
          <Loader />
        ) : (
          <div className="file-list-container">
            {results.length > 0 &&
              results.map((file, index) => (
                <div className="file-item result" key={index}>
                  <div>
                    {/* Link to open PDF in new tab */}
                    <a
                      href={getFileURl(file[0])}
                      target="_blank"
                      className="file-link"
                      rel="noopener noreferrer"
                    >
                      {getFilePath(file[0])}
                    </a>
                  </div>

                  <div className="pages-info">
                    <span className="pages-found-label">
                      Query matched at pages:{" "}
                    </span>
                    <span className="pages-list">
                      {file[1].join(", ")} {/* Displaying array of pages */}
                    </span>
                  </div>
                </div>
              ))}
            {results.length === 0 && (
              <p style={{ textAlign: "center" }}>
                Your Search does not match any documents
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
