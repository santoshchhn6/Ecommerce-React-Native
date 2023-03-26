import Nav from "./Components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./Components/Product";
import Cart from "./Components/Cart";
import User from "./Components/User";
import { useState } from "react";
import { useEffect } from "react";
import Login from "./Components/Login";

function App() {
  const [admin, setAdmin] = useState(false);

  const isAdmin = (data) => {
    console.log(data);
    setAdmin(data);
  };

  return (
    <Router>
      <div className="w-screen h-screen flex flex-row ">
        <Nav />
        {admin ? (
          <div className="w-screen h-screen bg-blue-200">
            <Routes>
              <Route path="/" element={<Product />} />
              <Route path="/product" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/user" element={<User />} />
            </Routes>
          </div>
        ) : (
          <Login isAdmin={isAdmin} />
        )}
      </div>
    </Router>
  );
}

export default App;
