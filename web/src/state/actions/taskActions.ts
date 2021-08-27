import { FormikValues } from 'formik'
import types, { AppThunk } from '../types'
import useAxios from '../../hooks/useAxios'
import taskAxios from '../../axios/taskAxios'

export const addTask = (values: FormikValues, familyId: number): AppThunk => {
  return async (dispatch) => {
    const axios = useAxios(taskAxios)
    try {
      const response = await axios.postRequest(`/family/${familyId}`, values)

      dispatch({ type: types.ADD_TASK, payload: response.data.data })
    } catch (err) {
      console.error(err)
      dispatch({ type: types.TASK_ERROR, payload: err.response?.msg })
    }
  }
}

export const fetchTasks = (familyId: number): AppThunk => {
  return async (dispatch) => {
    const axios = useAxios(taskAxios)
    try {
      dispatch({ type: types.IS_LOADING, payload: true })
      const response = await axios.getRequest(`/family/${familyId}`)
      if (response.status >= 200 && response.status < 400) {
        return dispatch({
          type: types.FETCH_TASKS,
          payload: response.data.data,
        })
      }
      throw new Error('Error fetching tasks')
    } catch (err) {
      console.error(err)
      dispatch({ type: types.IS_LOADING, payload: false })
      dispatch({ type: types.TASK_ERROR, payload: err.response?.msg ?? err })
    } finally {
      dispatch({ type: types.IS_LOADING, payload: false })
    }
  }
}

export const updateTasks = (
  taskId: number,
  familyId: number,
  values: FormikValues
): AppThunk => {
  return async (dispatch) => {
    const axios = useAxios(taskAxios)
    try {
      const response = await axios.updateRequest(
        `/${taskId}/family/${familyId}`,
        values
      )
      dispatch({ type: types.UPDATE_TASK, payload: response.data.data })
    } catch (err) {
      console.error(err)
    }
  }
}
