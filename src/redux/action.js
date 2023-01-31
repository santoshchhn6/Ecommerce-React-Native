export const types = {
  SET_PRODUCTS: "SET_PRODUCTS",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  INC_CART_QTY: "INC_CART_QTY",
  DEC_CART_QTY: "DEC_CART_QTY",
  ADD_TO_WISHLIST: "ADD_TO_WISHLIST",
  REMOVE_FROM_WISHLIST: "REMOVE_FROM_WISHLIST",
  SET_PRODUCT_LOADING: "SET_PRODUCT_LOADING",
  ADD_TO_PAYMENT: "ADD_TO_PAYMENT",
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

export const addToWishList = (payload) => {
  return { type: types.ADD_TO_WISHLIST, payload };
};

export const removeFromWishList = (payload) => {
  return { type: types.REMOVE_FROM_WISHLIST, payload };
};

export const setProductLoading = (payload) => {
  return { type: types.SET_PRODUCT_LOADING, payload };
};

export const addToPayment = (payload) => {
  return { type: types.ADD_TO_PAYMENT, payload };
};
