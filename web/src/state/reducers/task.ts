import types from '../types'
import { AnyAction } from 'redux'
import { ITask, IReducerState } from '../../types'

interface IState extends IReducerState {
  tasks: ITask[]
}

const initialState: IState = {
  isSuccess: false,
  isError: false,
  isLoading: false,
  error: '',
  tasks: [],
}

const taskReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.ADD_TASK:
      return {
        ...state,
        isSuccess: true,
        isError: false,
        error: '',
        tasks: [...state.tasks, action.payload],
      }
    case types.IS_LOADING:
      return { ...state, isLoading: action.payload }
    case types.FETCH_TASKS:
      return {
        ...state,
        isSuccess: true,
        isError: false,
        error: '',
        tasks: action.payload,
      }
    case types.UPDATE_TASK:
      const newTasks = state.tasks.map((task: ITask) => {
        if (task.id === action.payload.id) {
          return action.payload
        }
        return task
      })
      return {
        ...state,
        tasks: newTasks,
        isError: false,
        error: '',
      }
    case types.TASK_ERROR:
      return {
        ...state,
        isSuccess: false,
        tasks: [],
        isError: true,
        error: action.payload,
      }
    default:
      return state
  }
}

export default taskReducer
