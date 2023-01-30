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
          {
            id: payload.cartId,
            productId: payload.productId,
            quantity: payload.quantity,
            color: payload.color,
          },
        ],
      };
    }
    case types.REMOVE_FROM_CART: {
      return {
        ...state,
        cart: [...state.cart.filter((c) => c.id !== payload)],
      };
    }
    case types.INC_CART_QTY: {
      return {
        ...state,
        cart: [
          ...state.cart.map((c) => {
            const { productId, quantity } = c;
            if (productId === payload && quantity < 10) {
              return { ...c, quantity: quantity + 1 };
            } else {
              return c;
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
              return { ...c, quantity: quantity - 1 };
            } else {
              return c;
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
