import React, { useEffect, useState } from "react";
import { SketchPicker, SwatchesPicker } from "react-color";
import { addProduct, addProductImage, getProduct } from "../firebase";
import Loading from "./Loading";

const Product = () => {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    category: null,
    title: null,
    price: null,
    instock: true,
  });
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [visible, setVisible] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
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

  const uploadImage = async () => {
    const promise = new Promise((resolve, reject) => {
      const imagesArr = Object.entries(images);
      const promises = [];

      imagesArr.forEach((img, i) => {
        promises.push(addProductImage(images[i], inputs.category));
      });

      Promise.all(promises)
        .then((imgUrls) => {
          resolve(imgUrls);
        })
        .catch((err) => {
          reject(err);
        });
    });
    return await promise;
  };

  const addProductToDatabase = (imgUrls) => {
    const { title, price, category, instock, sizes, details } = inputs;
    const detailObj = {};
    const pSizes = sizes ? sizes.split(",") : [];

    details &&
      details.split("\n").forEach((element, i) => {
        let d = element.split("\t");
        detailObj[d[0]] = d[1];
      });

    console.log(detailObj);

    const product = {
      title,
      price,
      category,
      instock,
      sizes: pSizes,
      colors,
      details: detailObj,
      images: imgUrls,
    };

    addProduct(product)
      .then((response) => {
        setLoading(false);
        console.log(response);
        alert(response);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  };

  const handleSubmit = () => {
    const { category, title, price } = inputs;
    if (category && title && price) {
      //1.Check if product alredy exit in database
      //1. Upload images to firebase storage ,when completed return images urls
      //2. addProduct with image to firebase database
      setLoading(true);
      getProduct(inputs.title)
        .then((data) => {
          if (data.docs.length === 0) {
            uploadImage()
              .then((imgUrls) => addProductToDatabase(imgUrls))
              .catch((err) => {
                setLoading(false);
                console.log(err.message);
              });
          } else {
            setLoading(false);
            alert("Title alreay exit in database.");
          }
        })
        .catch((e) => {
          setLoading(false);
          console.log(e.message);
        });
    } else {
      alert("Please enter necessary data.");
    }
  };

  return (
    <div className="flex justify-center">
      {loading && <Loading />}
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
          name="price"
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
