import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import {
  productReducer,
  userReducer,
  cartReducer,
  wishListReducer,
  paymentReducer,
  orderReducer,
  reviewsReducer,
} from "./reducer";
const rootReducer = combineReducers({
  productReducer,
  userReducer,
  cartReducer,
  wishListReducer,
  paymentReducer,
  orderReducer,
  reviewsReducer,
});
export const Store = createStore(rootReducer, applyMiddleware(thunk));
