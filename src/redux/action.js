import { getProduct } from "../firebase";

export const types = {
  SET_PRODUCTS: "SET_PRODUCTS",
};

export const setProduct = (payload) => {
  return { type: types.SET_PRODUCTS, payload };
};
