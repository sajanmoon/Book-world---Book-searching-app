import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../Utils/cartSlice";

const Cart = () => {
  const books = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Cart</h1>
      {books.map((elem) => (
        <div key={elem.id} className="flex items-center mb-4 border-b pb-4">
          <img
            src={elem.volumeInfo.imageLinks.smallThumbnail}
            alt={elem.volumeInfo.title}
            className="w-24 h-24 object-cover mr-4"
          />
          <div>
            <h2 className="text-lg font-bold">{elem.volumeInfo.title}</h2>
            <p className="text-gray-700 mb-1">
              Price: Rs.{elem.saleInfo.listPrice.amount}/-
            </p>
            <button
              onClick={() => dispatch(removeItem(elem.id))}
              className="text-red-500 font-bold"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
