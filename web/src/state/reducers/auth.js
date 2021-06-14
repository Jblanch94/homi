import types from "../types";

const initialState = {
  isError: false,
  isSuccess: false,
  data: {},
  error: "",
  isLoading: false,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.IS_LOADING:
      return { ...state, isLoading: action.payload };
    case types.REGISTER_USER:
      return { ...state, isSuccess: true, data: action.payload };
    case types.LOGIN_USER:
      return { ...state, isSuccess: true, isAuthenticated: true };
    case types.AUTH_ERROR:
      return {
        ...state,
        isError: true,
        isSuccess: false,
        data: {},
        error: action.payload,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
