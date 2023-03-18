import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import {
  productReducer,
  userReducer,
  cartReducer,
  wishListReducer,
  paymentReducer,
  orderReducer,
} from "./reducer";
const appReducer = combineReducers({
  productReducer,
  userReducer,
  cartReducer,
  wishListReducer,
  paymentReducer,
  orderReducer,
});
const rootReducer=(state,action)=>{
  if (action.type === 'USER_LOGOUT') {
    return appReducer(undefined, action)
  }
  return appReducer(state,action);
}
export const Store = createStore(rootReducer, applyMiddleware(thunk));
