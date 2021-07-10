import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../store";

enum types {
  REGISTER_FAMILY_AND_USER = "REGISTER_FAMILY_AND_USER",
  IS_LOADING = "IS_LOADING",
  REGISTER_FAMILY = "REGISTER_FAMILY",
  REGISTER_USER = "REGISTER_USER",
  LOGIN_USER = "LOGIN_USER",
  AUTH_ERROR = "AUTH_ERROR",
  USER_ERROR = "USER_ERROR",
  FETCH_CURRENT_USER = "FETCH_CURRENT_USER",
  FETCH_USER_PROFILES = "FETCH_USER_PROFILES",
  FETCH_FAMILY = "FETCH_FAMILY",
  FAMILY_ERROR = "FAMILY_ERROR",
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export default types;
