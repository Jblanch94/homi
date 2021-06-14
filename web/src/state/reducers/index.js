import { combineReducers } from "redux";
import familyReducer from "./family";
import authReducer from "./auth";

const reducers = combineReducers({
  family: familyReducer,
  auth: authReducer,
});

export default reducers;
