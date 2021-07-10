import { combineReducers } from "redux";
import familyReducer from "./family";
import authReducer from "./auth";
import userReducer from "./user";

const reducers = combineReducers({
  family: familyReducer,
  auth: authReducer,
  user: userReducer,
});

export default reducers;
