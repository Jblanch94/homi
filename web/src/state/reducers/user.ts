import types from '../types'
import { AnyAction } from 'redux'
import { IUser } from '../../types'

interface IUserState {
  currentUser: IUser | {}
  userProfiles: Array<IUser> | []
  error: string
}

const initialState = {
  currentUser: {},
  userProfiles: [],
  error: '',
}

const userReducer = (state: IUserState = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.FETCH_CURRENT_USER:
      return { ...state, currentUser: action.payload }
    case types.FETCH_USER_PROFILES:
      return { ...state, userProfiles: action.payload }
    case types.USER_ERROR:
      return {
        ...state,
        error: action.payload,
        currentUser: {},
        userProfiles: [],
      }
    case types.REGISTER_USER:
      return state
    default:
      return state
  }
}

export default userReducer
