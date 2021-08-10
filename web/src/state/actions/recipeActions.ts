import { FormikValues } from "formik";
import types, { AppThunk } from "../types";

import useAxios from "../../hooks/useAxios";
import recipeAxios from "../../axios/recipeAxios";

export const addRecipe = (
  values: FormikValues,

  url: string
): AppThunk => {
  return async (dispatch) => {
    const axios = useAxios(recipeAxios);
    try {
      console.log(values);
      const response = await axios.postRequest(url, values);
      dispatch({ type: types.ADD_RECIPE, payload: response.data.data });
    } catch (err) {
      console.error(err);
      dispatch({
        type: types.RECIPE_ERROR,
        payload: err.response?.msg ?? "Server Error",
      });
    }
  };
};

export const fetchRecipes = (familyId: number): AppThunk => {
  return async (dispatch) => {
    const axios = useAxios(recipeAxios);

    try {
      const response = await axios.getRequest(`/family/${familyId}`);

      if (response.status >= 200 && response.status < 400) {
        return dispatch({
          type: types.FETCH_RECIPES,
          payload: response.data.data,
        });
      }

      throw new Error("Could not fetch recipes.");
    } catch (err) {
      console.error(err);
      dispatch({ type: types.RECIPE_ERROR, payload: err.response?.msg ?? err });
    }
  };
};

export const deleteRecipe = (recipeId: number, familyId: number): AppThunk => {
  return async (dispatch) => {
    const axios = useAxios(recipeAxios);
    try {
      const response = await axios.deleteRequest(
        `/${recipeId}/family/${familyId}`
      );
      dispatch({
        type: types.DELETE_RECIPE,
        payload: { ...response.data, recipeId },
      });
    } catch (err) {
      console.error(err);
    }
  };
};
