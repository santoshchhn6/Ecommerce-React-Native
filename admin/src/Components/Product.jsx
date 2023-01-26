import React, { useEffect, useState } from "react";
import { SketchPicker, SwatchesPicker } from "react-color";

const Product = () => {
  const [inputs, setInputs] = useState({});
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [visible, setVisible] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const product = {
      details: [],
    };
    console.log({ inputs });
    console.log(colors);
    console.log(images);
  };

  const handleChangeComplete = (color) => {
    setColors((prev) => [...prev, color.hex]);
    setVisible(false);
  };

  const removeColor = (i) => {
    setColors(colors.filter((color, index) => i !== index));
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      // console.log("filesArray: ", filesArray);

      setPreviews((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };
  return (
    <div className="flex justify-center">
      <div className="w-80  m-5 flex flex-col gap-3">
        <h1 className="text-2xl  mb-5"> Add Product</h1>
        <select
          defaultValue="category"
          onChange={handleInput}
          name="category"
          className="w-full h-8 p-1 rounded text-gray-700 outline-none bg-white"
        >
          <option value="category" disabled>
            Category
          </option>
          <option value="electronics">Electronics</option>
          <option value="appliances">Appliances</option>
          <option value="mobiles">Mobiles</option>
          <option value="fashion">Fashion</option>
          <option value="books">Books</option>
          <option value="sports">Sports</option>
          <option value="groceries">Groceries</option>
        </select>

        <input
          onChange={handleInput}
          type="text"
          name="title"
          placeholder="Title"
          className="w-full h-8 rounded text-gray-700 outline-none pl-2"
        />

        <input
          onChange={handleInput}
          type="number"
          name="title"
          placeholder="Price"
          className="w-full h-8 rounded text-gray-700 outline-none pl-2"
        />

        <select
          defaultValue="stock"
          name="instock"
          onChange={handleInput}
          className="w-full h-8 p-1 rounded text-gray-700 outline-none bg-white"
        >
          <option disabled value="stock">
            Stock
          </option>
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

        <input
          onChange={handleInput}
          type="text"
          name="sizes"
          placeholder="Sizes"
          className="w-full h-8 rounded text-gray-700 outline-none pl-2"
        />

        <textarea
          onChange={handleInput}
          type="text"
          name="details"
          placeholder="Details"
          className="w-full h-24 rounded text-gray-700 outline-none pl-2"
        />

        <div
          className={`w-full h-8 bg-white rounded text-gray-700 outline-none pl-2 flex items-center gap-2`}
        >
          <span>Images:</span>
          <input
            className="text-sm"
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>

        {previews && (
          <div className="w-full flex flex-row flex-wrap  gap-1">
            {previews.map((image, i) => (
              <img className="w-24 h-24  object-contain" key={i} src={image} />
            ))}
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full h-8 bg-white rounded text-gray-700 outline-none pl-2 flex items-center justify-center hover:text-gray-500 "
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default Product;
