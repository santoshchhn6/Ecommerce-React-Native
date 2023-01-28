import { types } from "./action";

const productInitialState = {
  products: [],
};

export const productReducer = (
  state = productInitialState,
  { type, payload }
) => {
  switch (type) {
    case types.SET_PRODUCTS: {
      return {
        ...state,
        products: payload,
      };
    }

    default:
      return state;
  }
};

const cartInitialState = {
  cart: [],
};
export const cartReducer = (state = cartInitialState, { type, payload }) => {
  switch (type) {
    case types.ADD_TO_CART: {
      return {
        ...state,
        cart: [...state.cart, payload],
      };
    }

    default:
      return state;
  }
};

const UserInitialState = {
  user: null,
};

export const userReducer = (state = UserInitialState, { type, payload }) => {
  switch (type) {
    // case types.SET_PRODUCTS: {
    //   return {
    //     ...state,
    //     products: payload,
    //   };
    // }

    default:
      return state;
  }
};
