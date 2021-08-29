import types from '../types'
import { AnyAction } from 'redux'
import { IReducerState } from '../../types'

interface IState extends IReducerState {
  data: any[]
}

const initialState: IState = {
  isLoading: false,
  isError: false,
  error: '',
  isSuccess: false,
  data: [],
}

const eventReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.FETCH_EVENTS:
      return {
        ...state,
        isError: false,
        error: '',
        isSuccess: true,
        data: action.payload,
      }
    case types.ADD_EVENT:
      return {
        ...state,
        isError: false,
        error: '',
        isSuccess: true,
        data: [...state.data, action.payload],
      }
    case types.EVENT_ERROR:
      return {
        ...state,
        isError: true,
        isSuccess: false,
        data: [],
        error: action.payload,
      }
    default:
      return state
  }
}

export default eventReducer
