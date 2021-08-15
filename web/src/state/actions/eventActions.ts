import types, { AppThunk } from "../types";
import useAxios from "../../hooks/useAxios";
import eventAxios from "../../axios/eventAxios";
import { FormikValues } from "formik";
import { History } from "history";

export const addEvent = (
  formValues: FormikValues,
  familyId: number,
  history: History
): AppThunk => {
  return async (dispatch) => {
    const axios = useAxios(eventAxios);
    try {
      dispatch({ type: types.IS_LOADING });
      const response = await axios.postRequest(
        `/family/${familyId}`,
        formValues
      );
      if (response.status >= 200 && response.status < 400) {
        history.push("/events");
      }

      dispatch({ type: types.ADD_RECIPE, payload: response.data.data });
    } catch (err) {
      console.error(err);
      dispatch({ type: types.EVENT_ERROR, payload: err.response.msg });
    }
  };
};
