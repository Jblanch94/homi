import { combineReducers } from "redux";
import familyReducer from "./family";
import authReducer from "./auth";
import userReducer from "./user";
import groceryReducer from "./grocery";
import recipeReducer from "./recipe";

const reducers = combineReducers({
  family: familyReducer,
  auth: authReducer,
  user: userReducer,
  grocery: groceryReducer,
  recipe: recipeReducer,
});

export default reducers;
