import types, { AppThunk } from "../types";
import useAxios from "../../hooks/useAxios";
import groceryAxios from "../../axios/groceryAxios";

export const fetchGroceries = (familyId: number): AppThunk => {
  return async (dispatch) => {
    dispatch({ type: types.IS_LOADING, payload: true });
    const axios = useAxios(groceryAxios);
    try {
      const response = await axios.getRequest(`/family/${familyId}`);
      const groceriesData = response.data.data;

      if (response.status < 400) {
        dispatch({ type: types.FETCH_GROCERIES, payload: groceriesData });
      } else {
        throw new Error("Could not fetch Groceries");
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: types.GROCERIES_ERROR,
        payload: err.response?.msg ?? err,
      });
    } finally {
      dispatch({ type: types.IS_LOADING, payload: false });
    }
  };
};

export const updateGroceryItem = (
  id: number,
  familyId: number,
  data: any
): AppThunk => {
  return async (dispatch) => {
    const axios = useAxios(groceryAxios);
    try {
      const response = await axios.updateRequest(
        `/${id}/family/${familyId}`,
        data
      );
      dispatch({ type: types.UPDATE_GROCERIES, payload: response.data });
      console.log(response);
    } catch (err) {
      console.error(err);
      dispatch({
        type: types.GROCERIES_ERROR,
        payload: err.response?.msg ?? "Could not update grocery",
      });
    }
  };
};
