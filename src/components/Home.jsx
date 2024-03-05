import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [inputText, setInputText] = useState("");
  const [inputData, setInputData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchApiData();
  }, []);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleClick = async () => {
    fetchApiData();
  };

  const fetchApiData = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${inputText}&key=AIzaSyBDEj_pTRbmT9btoJspSIsSD2F4awuXum8&maxResults=40`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const json = await response.json();
      if (json.totalItems === 0) {
        setErrorMessage("No books found for the entered search term");
        setInputData([]);
      } else {
        setInputData(json.items);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setErrorMessage("");
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center my-4">
        <input
          className="border border-black px-4 py-2 rounded-l"
          value={inputText}
          onChange={handleChange}
          type="text"
          placeholder="Enter book name"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          onClick={handleClick}
        >
          Search Book
        </button>
      </div>
      {errorMessage && inputText && (
        <p className="text-red-500">{errorMessage}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {inputData.map((elem) => {
          const thumbnail =
            elem.volumeInfo.imageLinks &&
            elem.volumeInfo.imageLinks.smallThumbnail;
          const price =
            elem.saleInfo &&
            elem.saleInfo.listPrice &&
            elem.saleInfo.listPrice.amount;
          if (thumbnail && price) {
            return (
              <div
                className="bookCards border border-gray-300 rounded p-4 hover:shadow-lg"
                key={elem.id}
              >
                <Link to={`/singleproductpage/${elem.id}`}>
                  <img
                    className="h-48 w-full object-contain mb-4"
                    src={thumbnail}
                    alt={elem.volumeInfo.title}
                  />
                  <h1 className="text-lg font-bold truncate">
                    {elem.volumeInfo.title}
                  </h1>
                </Link>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Home;
