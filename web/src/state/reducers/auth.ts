import types from "../types";
import { AnyAction } from "redux";

interface IAuth {
  isError: boolean;
  isSuccess: boolean;
  data: {};
  error: string;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const initialState: IAuth = {
  isError: false,
  isSuccess: false,
  data: {},
  error: "",
  isLoading: false,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.IS_LOADING:
      return { ...state, isLoading: action.payload };
    case types.REGISTER_USER:
      return { ...state, isSuccess: true, data: action.payload };
    case types.LOGIN_USER:
      console.log("calling login user reducer");
      return {
        ...state,
        isSuccess: true,
        isAuthenticated: true,
        isError: false,
        error: "",
      };
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
