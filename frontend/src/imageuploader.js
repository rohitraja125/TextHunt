import React, { useState } from "react";

const ImageUploader = () => {
  const [imageSrc, setImageSrc] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2>Image Uploader</h2>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      {imageSrc && (
        <div>
          <h3>Preview</h3>
          <img
            src={imageSrc}
            alt="Uploaded"
            style={{ maxWidth: "100%", maxHeight: "300px" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

{
  /* <div class="search-container">
          <img src="" alt="ocr" />
          <input type="text" class="search-input" placeholder="Search..." />
          <button class="search-button">
            <i class="fas fa-search"></i>
          </button>
        </div> */
}
