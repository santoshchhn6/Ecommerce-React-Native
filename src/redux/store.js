import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { productReducer, cartReducer, wishListReducer } from "./reducer";
const rootReducer = combineReducers({
  productReducer,
  cartReducer,
  wishListReducer,
});
export const Store = createStore(rootReducer, applyMiddleware(thunk));
