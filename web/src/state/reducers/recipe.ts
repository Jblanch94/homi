import types from '../types'
import { AnyAction } from 'redux'
import { IRecipe, IReducerState } from '../../types'

//TODO: need to have loading states

interface IRecipeState extends IReducerState {
  data: IRecipe[]
}

const initialState: IRecipeState = {
  isError: false,
  error: '',
  isSuccess: false,
  isLoading: false,
  data: [],
}

const recipeReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.ADD_RECIPE:
      return {
        ...state,
        isError: false,
        error: '',
        isSuccess: true,
        data: [...state.data, action.payload],
      }
    case types.DELETE_RECIPE:
      return {
        ...state,
        error: '',
        isError: false,
        isSuccess: true,
        data: state.data.filter(
          (recipe) => recipe.id !== action.payload.recipeId
        ),
      }
    case types.FETCH_RECIPES:
      return {
        ...state,
        isError: false,
        error: '',
        isSuccess: true,
        data: action.payload,
      }
    case types.RECIPE_ERROR:
      return {
        ...state,
        isSuccess: false,
        isError: true,
        error: action.payload,
        data: [],
      }
    default:
      return state
  }
}

export default recipeReducer
