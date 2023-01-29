import { cart } from "../data/data";
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
        cart: [
          ...state.cart,
          { productId: payload.id, quantity: payload.quantity },
        ],
      };
    }
    case types.REMOVE_FROM_CART: {
      return {
        ...state,
        cart: [...state.cart.filter((c) => c.productId !== payload)],
      };
    }
    case types.INC_CART_QTY: {
      return {
        ...state,
        cart: [
          ...state.cart.map((c) => {
            const { productId, quantity } = c;
            if (productId === payload && quantity < 10) {
              return { productId, quantity: quantity + 1 };
            } else {
              return {
                productId,
                quantity,
              };
            }
          }),
        ],
      };
    }
    case types.DEC_CART_QTY: {
      return {
        ...state,
        cart: [
          ...state.cart.map((c) => {
            const { productId, quantity } = c;
            if (productId === payload && quantity > 1) {
              return { productId, quantity: quantity - 1 };
            } else {
              return {
                productId,
                quantity,
              };
            }
          }),
        ],
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
