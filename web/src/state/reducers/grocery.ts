import { AnyAction } from "redux";
import types from "../types";

interface IGrocery {
  id: number;
  item: string;
  details: string;
  bought: boolean;
  quantity: number;
  UserId: number;
  FamilyId: number;
}

interface IGroceryState {
  isLoading: boolean;
  groceries: IGrocery[];
  isError: boolean;
  error: string;
}

const initialState: IGroceryState = {
  isLoading: false,
  groceries: [],
  isError: false,
  error: "",
};

const groceryReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.FETCH_GROCERIES:
      return { ...state, groceries: action.payload };
    case types.GROCERIES_ERROR:
      return {
        ...state,
        groceries: [],
        isError: true,
        isLoading: false,
        error: action.payload,
      };
    case types.UPDATE_GROCERIES:
      const index = state.groceries.findIndex(
        (el) => el.id === action.payload.data.id
      );
      return {
        ...state,
        groceries: [
          ...state.groceries.slice(0, index),
          { ...action.payload.data },
          ...state.groceries.slice(index + 1),
        ],
        isError: false,
        error: "",
      };
    case types.IS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default groceryReducer;
