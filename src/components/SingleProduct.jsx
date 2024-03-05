import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addItem } from "../Utils/cartSlice";

const SingleProduct = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyBDEj_pTRbmT9btoJspSIsSD2F4awuXum8`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const json = await response.json();
        setBook(json);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleAdd = () => {
    if (book) {
      dispatch(addItem(book));
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-4">{book.volumeInfo.title}</h1>
          {book.volumeInfo.imageLinks &&
            book.volumeInfo.imageLinks.thumbnail && (
              <img
                className="h-[400px]  object-cover mb-4"
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
              />
            )}
          <p className="text-gray-700 mb-2">
            <span className="font-bold">Author:</span> {book.volumeInfo.authors}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-bold">Published Date:</span>{" "}
            {book.volumeInfo.publishedDate}
          </p>
          {book.saleInfo && book.saleInfo.retailPrice && (
            <p className="text-blue-700 mb-4">
              <span className="font-bold">Price:</span> Rs.
              {book.saleInfo.retailPrice.amount}/-
            </p>
          )}
          <button
            onClick={handleAdd}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
