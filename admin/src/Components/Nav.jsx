import React, { useState } from "react";
import { BsShopWindow } from "react-icons/bs";
import { TfiShoppingCart } from "react-icons/tfi";
import { SlUser } from "react-icons/sl";
import { Link } from "react-router-dom";

const Nav = () => {
  const [active, setActive] = useState("product");
  return (
    <div className="bg-gray-900 w-14 h-screen flex flex-col items-center pt-5 gap-5">
      <Link to="/product">
        <BsShopWindow
          onClick={() => {
            setActive("product");
          }}
          className={`text-4xl text-blue-200  hover:cursor-pointer rounded-md p-1  ${
            active === "product" ? "bg-blue-200 text-gray-900" : ""
          }`}
        />
      </Link>

      <Link to="/cart">
        <TfiShoppingCart
          onClick={() => {
            setActive("cart");
          }}
          className={`text-4xl text-blue-200  hover:cursor-pointer rounded-md p-1  ${
            active === "cart" ? "bg-blue-200 text-gray-900" : ""
          }`}
        />
      </Link>

      <Link to="/user">
        <SlUser
          onClick={() => {
            setActive("user");
          }}
          className={`text-4xl text-blue-200  hover:cursor-pointer rounded-md p-1  ${
            active === "user" ? "bg-blue-200 text-gray-900" : ""
          }`}
        />
      </Link>
    </div>
  );
};

export default Nav;
