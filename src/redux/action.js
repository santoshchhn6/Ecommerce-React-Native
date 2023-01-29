export const types = {
  SET_PRODUCTS: "SET_PRODUCTS",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  INC_CART_QTY: "INC_CART_QTY",
  DEC_CART_QTY: "DEC_CART_QTY",
};

export const setProduct = (payload) => {
  return { type: types.SET_PRODUCTS, payload };
};

export const addToCart = (payload) => {
  return { type: types.ADD_TO_CART, payload };
};

export const removeFromCart = (payload) => {
  return { type: types.REMOVE_FROM_CART, payload };
};

export const incQty = (payload) => {
  return { type: types.INC_CART_QTY, payload };
};

export const decQty = (payload) => {
  return { type: types.DEC_CART_QTY, payload };
};
