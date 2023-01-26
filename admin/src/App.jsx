import Nav from "./Components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./Components/Product";
import Cart from "./Components/Cart";
import User from "./Components/User";

function App() {
  return (
    <Router>
      <div className="w-screen h-screen flex flex-row">
        <Nav />
        <div className="w-screen h-screen bg-blue-200">
          <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/product" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
