import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { productReducer, cartReducer } from "./reducer";
const rootReducer = combineReducers({ productReducer, cartReducer });
export const Store = createStore(rootReducer, applyMiddleware(thunk));
