import types, { AppThunk } from '../types'
import familyAxios from '../../axios/familyAxios'
import useAxios from '../../hooks/useAxios'

export const fetchFamily = (familyId: number): AppThunk => {
  return async (dispatch) => {
    const axios = useAxios(familyAxios)
    try {
      const auth = JSON.parse(window.localStorage.getItem('auth') ?? '{}')
      const token = auth?.accessToken

      const family = await axios.getRequest(`/${familyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return dispatch({
        type: types.FETCH_FAMILY,
        payload: family.data.data.family,
      })
    } catch (error) {
      console.error(error.message)
      dispatch({ type: types.FAMILY_ERROR, payload: '' })
    }
  }
}
