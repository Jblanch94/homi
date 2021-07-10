import types from "../types";
import { AnyAction } from "redux";

const familyReducer = (state = {}, action: AnyAction) => {
  switch (action.type) {
    case types.REGISTER_FAMILY:
      return action.payload;
    case types.FETCH_FAMILY:
      return action.payload;
    default:
      return state;
  }
};

export default familyReducer;
