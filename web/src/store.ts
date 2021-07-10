import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducers from "./state/reducers";

const middlewares = [thunk];

const store = createStore(reducers, {}, applyMiddleware(...middlewares));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
