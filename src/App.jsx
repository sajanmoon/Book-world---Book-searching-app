import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route
            path="/singleproductpage/:id"
            element={<SingleProduct />}
          ></Route>
          <Route path="cart" element={<Cart />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
