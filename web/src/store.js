import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducers from "./state/reducers";

const middlewares = [thunk];
const persistedState = window.localStorage.getItem("auth")
  ? { auth: JSON.parse(window.localStorage.getItem("auth")) }
  : {};
const store = createStore(
  reducers,
  persistedState,
  applyMiddleware(...middlewares)
);

export default store;
