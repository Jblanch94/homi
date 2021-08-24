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
