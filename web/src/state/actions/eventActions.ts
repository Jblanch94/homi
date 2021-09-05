import types, { AppThunk } from '../types'
import useAxios from '../../hooks/useAxios'
import eventAxios from '../../axios/eventAxios'
import { FormikValues } from 'formik'
import { History } from 'history'

export const addEvent = (
  formValues: FormikValues,
  familyId: number,
  history: History
): AppThunk => {
  return async (dispatch) => {
    const axios = useAxios(eventAxios)
    const token = JSON.parse(
      window.localStorage.getItem('auth') ?? '{}'
    )?.accessToken

    try {
      dispatch({ type: types.IS_LOADING })
      const response = await axios.postRequest(
        `/family/${familyId}`,
        formValues,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (response.status >= 200 && response.status < 400) {
        history.push('/events')
      }

      dispatch({ type: types.ADD_RECIPE, payload: response.data.data })
    } catch (err) {
      console.error(err)
      dispatch({ type: types.EVENT_ERROR, payload: err.response.msg })
    }
  }
}

export const fetchEventsByDay = (day: Date, familyId: number): AppThunk => {
  return async (dispatch) => {
    const axios = useAxios(eventAxios)
    const token = JSON.parse(
      window.localStorage.getItem('auth') ?? '{}'
    )?.accessToken

    try {
      const response = await axios.getRequest(`/family/${familyId}`, {
        params: {
          day,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status >= 200 && response.status < 400) {
        dispatch({ type: types.FETCH_EVENTS, payload: response.data.data })
      }
    } catch (err) {
      console.error(err)
    }
  }
}
