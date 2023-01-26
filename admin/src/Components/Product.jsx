import React, { useState } from "react";
import { SketchPicker, SwatchesPicker } from "react-color";

const Product = () => {
  const [currentColor, setCurrentColor] = useState("#fff");
  const [visible, setVisible] = useState(false);
  const [colors, setColors] = useState([]);
  const handleChangeComplete = (color) => {
    setCurrentColor(color);
    setColors((prev) => [...prev, color.hex]);
    setVisible(false);
  };

  const removeColor = (i) => {
    setColors(colors.filter((color, index) => i !== index));
  };
  console.log(colors);
  return (
    <div className="flex justify-center">
      <div className="w-80  m-5 flex flex-col gap-3">
        <h1 className="text-2xl  mb-5"> Add Product</h1>
        <select className="w-full h-8 p-1 rounded text-gray-700 outline-none bg-white">
          <option value="electronics">Electronics</option>
          <option value="appliances">Appliances</option>
          <option value="mobiles">Mobiles</option>
          <option value="fashion">Fashion</option>
          <option value="books">Books</option>
          <option value="sports">Sports</option>
          <option value="groceries">Groceries</option>
        </select>

        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full h-8 rounded text-gray-700 outline-none pl-2"
        />
        <input
          type="number"
          name="title"
          placeholder="Price"
          className="w-full h-8 rounded text-gray-700 outline-none pl-2"
        />

        <select className="w-full h-8 p-1 rounded text-gray-700 outline-none bg-white">
          <option value="true">InStock</option>
          <option value="false">OutOfStock</option>
        </select>

        <div
          className={`w-full h-8 bg-white rounded text-gray-700 outline-none pl-2 flex items-center gap-2`}
        >
          <span className="text-gray-700 ">Color :</span>
          {colors.map((color, i) => {
            return (
              <div
                onClick={() => removeColor(i)}
                style={{ background: color }}
                key={i}
                className={`w-6 h-6 rounded border-2 border-gray-400 flex justify-center items-center text-transparent text-2xl   hover:text-white hover:cursor-pointer`}
              >
                -
              </div>
            );
          })}
          <div
            onClick={() => setVisible(true)}
            className="w-6 h-6 rounded border-2 border-gray-400 flex justify-center items-center hover:opacity-50 hover:cursor-pointer"
          >
            +
          </div>
        </div>

        {visible && <SwatchesPicker onChangeComplete={handleChangeComplete} />}
      </div>
    </div>
  );
};

export default Product;
