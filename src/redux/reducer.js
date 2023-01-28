import { types } from "./action";

export const initialState = {
  products: [],
};

const reducer = (state = initialState, { type, payload }) => {
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

export default reducer;
