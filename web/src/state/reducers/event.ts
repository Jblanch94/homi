import types from "../types";
import { AnyAction } from "redux";

interface IState {
  isLoading: boolean;
  isError: boolean;
  error: string;
  isSuccess: boolean;
  data: any[];
}

const initialState: IState = {
  isLoading: false,
  isError: false,
  error: "",
  isSuccess: false,
  data: [],
};

const eventReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.ADD_EVENT:
      return {
        ...state,
        isError: false,
        error: "",
        isSuccess: true,
        data: [...state.data, action.payload],
      };
    case types.EVENT_ERROR:
      return {
        ...state,
        isError: true,
        isSuccess: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default eventReducer;
