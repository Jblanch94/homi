import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../store'

enum types {
  REGISTER_FAMILY_AND_USER = 'REGISTER_FAMILY_AND_USER',
  IS_LOADING = 'IS_LOADING',
  AUTH_REFRESH_TOKEN = 'AUTH_REFRESH_TOKEN',
  REGISTER_FAMILY = 'REGISTER_FAMILY',
  REGISTER_USER = 'REGISTER_USER',
  LOGIN_USER = 'LOGIN_USER',
  AUTH_ERROR = 'AUTH_ERROR',
  USER_ERROR = 'USER_ERROR',
  FETCH_CURRENT_USER = 'FETCH_CURRENT_USER',
  FETCH_USER_PROFILES = 'FETCH_USER_PROFILES',
  FETCH_FAMILY = 'FETCH_FAMILY',
  FAMILY_ERROR = 'FAMILY_ERROR',
  FETCH_GROCERIES = 'FETCH_GROCERIES',
  GROCERIES_ERROR = 'GROCERIES_ERROR',
  UPDATE_GROCERIES = 'UPDATE_GROCERIES',
  ADD_RECIPE = 'ADD_RECIPE',
  RECIPE_ERROR = 'RECIPE_ERROR',
  FETCH_RECIPES = 'FETCH_RECIPES',
  DELETE_RECIPE = 'DELETE_RECIPES',
  ADD_EVENT = 'ADD_EVENT',
  EVENT_ERROR = 'EVENT_ERROR',
  FETCH_EVENTS = 'FETCH_EVENTS',
  ADD_TASK = 'ADD_TASK',
  TASK_ERROR = 'TASK_ERROR',
  FETCH_TASKS = 'FETCH_TASKS',
  UPDATE_TASK = 'UPDATE_TASK',
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>

export default types
