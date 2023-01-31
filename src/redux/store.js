import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import {
  productReducer,
  cartReducer,
  wishListReducer,
  paymentReducer,
} from "./reducer";
const rootReducer = combineReducers({
  productReducer,
  cartReducer,
  wishListReducer,
  paymentReducer,
});
export const Store = createStore(rootReducer, applyMiddleware(thunk));
