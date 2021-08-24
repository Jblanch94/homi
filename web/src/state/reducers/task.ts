import types from '../types'
import { AnyAction } from 'redux'

interface ITask {
  id: number
  FamilyId: number
  name: string
  notes: string
  completed: boolean
}

interface IState {
  isSuccess: boolean
  isError: boolean
  error: string | null
  tasks: ITask[]
}

const initialState: IState = {
  isSuccess: false,
  isError: false,
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
