import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import MainPage from "./pages/MainPage";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // const sendDataToBackend = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:5000/members", {
  //       key: "value", // Your data object
  //     });
  //     console.log(response.data); // Log the response from the backend
  //   } catch (error) {
  //     console.error("Error sending data:", error);
  //   }
  // };

  // const [data, setData] = useState({});

  useEffect(() => {
    // sendDataToBackend();
  }, []);

  // const fetchdata = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/members");
  //     const jsondata = await response.json();
  //     setData(jsondata);
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// const ImageUploader = () => {
//   const [imageSrc, setImageSrc] = useState("");

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImageSrc(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div>
//       <h2>Image Uploader</h2>
//       <label htmlFor="fileInput" className="custom-file-input">
//         Custom Button Text
//         <input
//           id="fileInput"
//           type="file"
//           onChange={handleImageChange}
//           accept="image/*"
//           style={{ display: "none" }}
//         />
//       </label>
//       {imageSrc && (
//         <div>
//           <h3 className="rohit">Preview</h3>
//           <img
//             src={imageSrc}
//             alt="Uploaded"
//             style={{ maxWidth: "100%", maxHeight: "300px" }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

export default App;
