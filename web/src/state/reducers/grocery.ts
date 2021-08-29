import { AnyAction } from 'redux'
import types from '../types'

import { IGrocery, IReducerState } from '../../types'

interface IGroceryState extends IReducerState {
  groceries: IGrocery[]
}

const initialState: IGroceryState = {
  isLoading: false,
  isSuccess: false,
  groceries: [],
  isError: false,
  error: '',
}

const groceryReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.FETCH_GROCERIES:
      return {
        ...state,
        groceries: action.payload,
        isSuccess: true,
        isError: false,
        error: '',
      }
    case types.GROCERIES_ERROR:
      return {
        ...state,
        groceries: [],
        isError: true,
        isLoading: false,
        isSuccess: false,
        error: action.payload,
      }
    case types.UPDATE_GROCERIES:
      const index = state.groceries.findIndex(
        (el) => el.id === action.payload.data.id
      )
      return {
        ...state,
        groceries: [
          ...state.groceries.slice(0, index),
          { ...action.payload.data },
          ...state.groceries.slice(index + 1),
        ],
        isError: false,
        error: '',
        isSuccess: true,
      }
    case types.IS_LOADING:
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

export default groceryReducer
