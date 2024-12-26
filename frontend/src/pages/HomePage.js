import React, { useState } from "react";
import axios from "axios";
import "../temp.css";

import pdfIcon from "../pdf-icon.png";
import imageIcon from "../image-icon.png";
import dragDropIcon from "../drag-drop-icon.png";
import docxIcon from "../docx-icon.png";
import { useNavigate } from "react-router-dom";

export default function FileUpload() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleFiles = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((files) => [...files, ...selectedFiles]);
  };

  const getFileType = (file) => {
    const fileType = file.name.split(".")[1];
    if (fileType === "pdf") {
      return pdfIcon;
    } else if (fileType === "docx") {
      return docxIcon;
    } else {
      return imageIcon;
    }
  };

  const handleRemoveFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const Upload = async () => {
    try {
      setIsLoading(true); // Start loading
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("file", file);
      });

      const response = await axios.post(
        "http://localhost:5000/members",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      setIsLoading(false); // Stop loading
      navigate("/search");
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsLoading(false); // Stop loading on error
    }
  };

  return (
    <div className="homepage">
      <header>
        <nav>
          <div className="container">
            <h1>TextHunt</h1>
          </div>
        </nav>
        <div className="header-content">
          <p className="tagline">Intelligent Document Search & Highlighting</p>
        </div>
      </header>
      <div className="file-upload-container">
        <div className="upload-container">
          {isLoading && (
            <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>
          )}
          <div className={`upload-section ${isLoading ? "disabled" : ""}`}>
            <div className="upload-box">
              <input
                type="file"
                id="fileInput"
                accept=".pdf,.png,.jpg,.jpeg,.docx"
                multiple
                onChange={handleFiles}
                hidden
                disabled={isLoading} // Disable file input during upload
              />
              <label htmlFor="fileInput" className="upload-label">
                <img
                  src={dragDropIcon}
                  alt="Drag and Drop"
                  className="drag-drop-icon"
                />
                <p>Browse Files (pdf, .png, .jpeg, .jpg, .docx)</p>
              </label>
            </div>
          </div>
        </div>

        <div className="uploaded-files">
          {files.map((file, index) => (
            <div key={index} className="file-item">
              <img
                src={getFileType(file)}
                alt="file"
                className="file-thumbnail"
              />
              <div className="file-info">
                <span className="file-name">{file.name}</span>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveFile(index)}
                  disabled={isLoading} // Disable remove button during upload
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {files.length > 0 && !isLoading && (
          <button className="upload-button" onClick={Upload}>
            Upload Files
          </button>
        )}
      </div>
    </div>
  );
}
