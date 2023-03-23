import { types } from "./action";

const DemoInitialState = {
  demo: false,
};

export const demoReducer = (state = DemoInitialState, { type, payload }) => {
  switch (type) {
    case types.SET_DEMO_LOGIN: {
      return { demo: true };
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
    case types.SET_USER: {
      return { user: payload };
    }

    default:
      return state;
  }
};

const productInitialState = {
  products: [],
  loading: false,
  rating: {
    count: 1,
    rating: 1,
  },
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
    case types.SET_PRODUCT_LOADING: {
      return {
        ...state,
        loading: payload,
      };
    }
    case types.ADD_RATING: {
      return {
        ...state,
        products: [
          ...state.products.map((product) => {
            if (product.id === payload.productId) {
              return {
                ...product,
                rating: { count: payload.count, star: payload.star },
              };
            } else return product;
          }),
        ],
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
    case types.REMOVE_FROM_CART: {
      return {
        ...state,
        cart: [...state.cart.filter((c) => c.id !== payload)],
      };
    }
    case types.RESET_CART: {
      return {
        cart: [],
      };
    }
    case types.SET_CART: {
      return {
        cart: payload,
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
const wishInitialState = {
  wishList: [],
};
export const wishListReducer = (
  state = wishInitialState,
  { type, payload }
) => {
  switch (type) {
    case types.ADD_TO_WISHLIST: {
      return {
        ...state,
        wishList: [...state.wishList, payload],
      };
    }
    case types.SET_WISHLIST: {
      return {
        wishList: payload,
      };
    }
    case types.REMOVE_FROM_WISHLIST: {
      return {
        ...state,
        wishList: [...state.wishList.filter((w) => w.id !== payload)],
      };
    }

    default:
      return state;
  }
};
const paymentInitialState = {
  payment: [],
};
export const paymentReducer = (
  state = paymentInitialState,
  { type, payload }
) => {
  switch (type) {
    case types.ADD_TO_PAYMENT: {
      return {
        payment: payload,
      };
    }
    case types.RESET_PAYMENT: {
      return {
        payment: [],
      };
    }

    default:
      return state;
  }
};

const orderInitialState = {
  orders: [],
};
export const orderReducer = (state = orderInitialState, { type, payload }) => {
  switch (type) {
    case types.ADD_TO_ORDER: {
      return {
        ...state,
        orders: [...state.orders, ...payload],
      };
    }
    case types.SET_ORDERS: {
      return {
        orders: payload,
      };
    }

    default:
      return state;
  }
};

const reviewInitialState = {
  reviews: [],
};
export const reviewReducer = (
  state = reviewInitialState,
  { type, payload }
) => {
  switch (type) {
    case types.ADD_REVIEW: {
      return { reviews: [...state.reviews, payload] };
    }

    default:
      return state;
  }
};
