import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const items = useSelector((state) => state.cart);
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-xl font-bold">
          Books World
        </Link>
        <ul className="flex gap-4">
          <li>
            <Link
              to="/cart"
              className="text-white hover:underline flex items-center"
            >
              <span>Favourite:</span>
              <span className="ml-1 text-yellow-200">{items.length}</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
