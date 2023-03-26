import React, { useState } from "react";
import { BsShopWindow } from "react-icons/bs";
import { TfiShoppingCart } from "react-icons/tfi";
import { SlUser } from "react-icons/sl";
import { Link } from "react-router-dom";

const Nav = () => {
  const [active, setActive] = useState("product");
  const buttons = ["product", "cart", "user"];
  return (
    <div className="bg-gray-900 w-14 min-h-screen flex flex-col items-center pt-5 gap-5">
      {buttons.map((currentButton, i) => (
        <Link
          key={i}
          to={`/${currentButton} `}
          onClick={() => {
            setActive(currentButton);
          }}
          className={`text-4xl text-blue-200  hover:cursor-pointer rounded-md p-1  ${
            active === currentButton ? "bg-blue-200 text-gray-800" : null
          }`}
        >
          <Icon name={currentButton} />
        </Link>
      ))}
    </div>
  );
};

const Icon = ({ name }) => {
  switch (name) {
    case "product":
      return <BsShopWindow />;
    case "cart":
      return <TfiShoppingCart />;
    case "user":
      return <SlUser />;
    default:
      return <p>No Icon</p>;
  }
};

export default Nav;
