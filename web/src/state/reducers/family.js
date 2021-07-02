import types from "../types";

const familyReducer = (state = {}, action) => {
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
