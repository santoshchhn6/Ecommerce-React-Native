export const types = {
  SET_PRODUCTS: "SET_PRODUCTS",
  ADD_TO_CART: "ADD_TO_CART",
};

export const setProduct = (payload) => {
  return { type: types.SET_PRODUCTS, payload };
};
export const addToCart = (payload) => {
  return { type: types.ADD_TO_CART, payload };
};
