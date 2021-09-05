import types, { AppThunk } from '../types'
import useAxios from '../../hooks/useAxios'
import groceryAxios from '../../axios/groceryAxios'
import { FormikValues } from 'formik'
import { History } from 'history'

export const fetchGroceries = (familyId: number): AppThunk => {
  return async (dispatch) => {
    dispatch({ type: types.IS_LOADING, payload: true })
    const axios = useAxios(groceryAxios)
    const token = JSON.parse(
      window.localStorage.getItem('auth') ?? '{}'
    )?.accessToken

    try {
      const response = await axios.getRequest(`/family/${familyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const groceriesData = response.data.data

      if (response.status < 400) {
        dispatch({ type: types.FETCH_GROCERIES, payload: groceriesData })
      } else {
        throw new Error('Could not fetch Groceries')
      }
    } catch (err) {
      console.error(err)
      dispatch({
        type: types.GROCERIES_ERROR,
        payload: err.response?.msg ?? err,
      })
    } finally {
      dispatch({ type: types.IS_LOADING, payload: false })
    }
  }
}

export const updateGroceryItem = (
  id: number,
  familyId: number,
  data: any
): AppThunk => {
  return async (dispatch) => {
    const axios = useAxios(groceryAxios)
    const token = JSON.parse(
      window.localStorage.getItem('auth') ?? '{}'
    )?.accessToken

    try {
      const response = await axios.updateRequest(
        `/${id}/family/${familyId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      dispatch({ type: types.UPDATE_GROCERIES, payload: response.data })
    } catch (err) {
      console.error(err)
      dispatch({
        type: types.GROCERIES_ERROR,
        payload: err.response?.msg ?? 'Could not update grocery',
      })
    }
  }
}

export const addGroceryItem = (
  familyId: number,
  data: FormikValues,
  history: History
): AppThunk => {
  return async (dispatch) => {
    const axios = useAxios(groceryAxios)
    const token = JSON.parse(
      window.localStorage.getItem('auth') ?? '{}'
    )?.accessToken

    try {
      await axios.postRequest(`/family/${familyId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (err) {
      console.error(err)
      dispatch({
        type: types.GROCERIES_ERROR,
        payload: err.response?.msg ?? 'Server Error',
      })
    } finally {
      history.push('/groceries')
    }
  }
}
